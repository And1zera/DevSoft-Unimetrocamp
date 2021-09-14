import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../interfaces';
import { api } from '../services/api';

interface CartProviderProps {
  children: React.ReactNode;
}

interface UpdatedProductAmount {
  productId: number;
  qtd: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  updatedProductAmount: ({ productId, qtd }: UpdatedProductAmount) => void;
}

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('cart');
    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const productAlreadyInCart = cart.find(
        product => product.id === productId
      );
      const { data: product } = await api.get<Product>(
        `/products/${productId}`
      );

      if (!productAlreadyInCart && product.amount > 0) {
        setCart([...cart, { ...product, qtd: 1 }]);
        localStorage.setItem(
          'cart',
          JSON.stringify([...cart, { ...product, qtd: 1 }])
        );
        toast.success('Produto adicionado ao carrinho');
        return;
      }

      if (productAlreadyInCart && product.amount > productAlreadyInCart.qtd) {
        const updatedCart = cart.map(product =>
          product.id === productId
            ? { ...product, qtd: Number(product.qtd + 1) }
            : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Produto adicionado ao carrinho');
      } else {
        toast.error('Quantidade solicitada fora de estoque');
      }
    } catch (err) {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExistInCart = cart.some(product => product.id === productId);

      if (!productExistInCart) {
        toast.error('Erro na remoção do produto');
        return;
      }

      const updatedProduct = cart.filter(product => product.id !== productId);
      setCart(updatedProduct);
      localStorage.setItem('cart', JSON.stringify(updatedProduct));
      toast.success('Produto removido');
    } catch (err) {
      toast.error('Erro na remoção do produto');
    }
  };

  const updatedProductAmount = async ({
    productId,
    qtd,
  }: UpdatedProductAmount) => {
    try {
      if (qtd < 1) {
        toast.error('Erro na alteração de quantidade do produto');
        return;
      }

      const { data } = await api.get(`/products/${productId}`);
      const productAmount = data.amount;
      const stockNoExistInProduct = qtd > productAmount;

      if (stockNoExistInProduct) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const productExistInCart = cart.some(product => product.id === productId);

      if (!productExistInCart) {
        toast.error('Erro na alteração de quantidade do produto');
        return;
      }

      const updatedProduct = cart.map(product =>
        product.id === productId
          ? {
              ...product,
              qtd,
            }
          : product
      );

      setCart(updatedProduct);
      localStorage.setItem('cart', JSON.stringify(updatedProduct));
    } catch (err) {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updatedProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
