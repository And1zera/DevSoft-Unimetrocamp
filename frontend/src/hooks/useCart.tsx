import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../interfaces';
import { api } from '../services/api';

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  loading: boolean;
  handleLoading: (loading: boolean) => void;
  setCart: (value: Product[]) => void;
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
  const [loading, setLoading] = useState(false);

  const handleLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  const addProduct = async (productId: string) => {
    try {
      setLoading(true);

      const productAlreadyInCart = cart.find(
        product => product.id === productId
      );

      const { data: product } = await api.get(`/Evento/${productId}`);
      if (!productAlreadyInCart) {
        setCart([...cart, { ...product.result, qtd: 1 }]);
        localStorage.setItem(
          'cart',
          JSON.stringify([...cart, { ...product.result, qtd: 1 }])
        );
        toast.success('Produto adicionado ao carrinho');
        setLoading(false);
        return;
      }

      if (
        productAlreadyInCart &&
        product.qtdIngresso <= productAlreadyInCart.qtdIngresso
      ) {
        toast.error('Quantidade solicitada fora de estoque');
        setLoading(false);
        return;
      }

      toast.warning('Esse produto já existe no carrinho.');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = async (productId: string) => {
    setLoading(true);
    try {
      const productExistInCart = cart.find(product => product.id === productId);
      if (!productExistInCart) {
        toast.error('Erro na remoção do produto');
        setLoading(false);
        return;
      }
      const updatedProduct = cart.filter(product => product.id !== productId);
      setCart(updatedProduct);
      localStorage.setItem('cart', JSON.stringify(updatedProduct));
      toast.success('Produto removido');
      setLoading(false);
    } catch (err) {
      toast.error('Erro na remoção do produto');
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        loading,
        handleLoading,
        setCart,
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
