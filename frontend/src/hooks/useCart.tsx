import React, { createContext, useCallback, useContext, useState } from 'react';
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
  loadShoppingCart: (product: Product[]) => void;
}

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([]);

  const loadShoppingCart = useCallback((products: Product[]) => {
    setCart(products);
  }, []);

  const addProduct = async (productId: number) => {
    try {
      const { data } = await api.get<Product>('/shoppingCart');
      setCart([...cart, { ...data }]);

      const productAlreadyInCart = cart.find(
        product => product.id === productId
      );

      const { data: product } = await api.get<Product>(
        `/products/${productId}`
      );

      if (!productAlreadyInCart && product.amount > 0) {
        const { data } = await api.post('/shoppingCart', {
          ...product,
          qtd: 1,
        });
        setCart([...cart, { ...data, qtd: 1 }]);
        toast.success('Produto adicionado ao carrinho');
        return;
      }

      if (productAlreadyInCart && product.amount <= productAlreadyInCart.qtd) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      cart.map(async product => {
        if (product.id === productId) {
          await api.put(`/shoppingCart/${productId}`, {
            ...product,
            qtd: Number(product.qtd + 1),
          });
          return;
        }
        // eslint-disable-next-line consistent-return
        return product;
      });
      const { data: shopping } = await api.get<Product[]>('/shoppingCart');
      setCart(shopping);
      toast.success('Produto adicionado ao carrinho');
    } catch (err) {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      const productExistInCart = cart.find(product => product.id === productId);
      if (!productExistInCart) {
        toast.error('Erro na remoção do produto');
        return;
      }
      await api.delete<Product>(`/shoppingCart/${productExistInCart.id}`);
      const { data: products } = await api.get<Product[]>('/shoppingCart');
      setCart(products);
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
      const productExistInCart = cart.find(product => product.id === productId);
      if (!productExistInCart) {
        toast.error('Erro na alteração de quantidade do produto');
        return;
      }
      cart.map(async product => {
        if (product.id === productId) {
          await api.put(`/shoppingCart/${productExistInCart.id}`, {
            ...product,
            qtd,
          });
          return;
        }
        // eslint-disable-next-line consistent-return
        return product;
      });
      const { data: products } = await api.get<Product[]>('/shoppingCart');
      setCart(products);
    } catch (err) {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updatedProductAmount,
        loadShoppingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
