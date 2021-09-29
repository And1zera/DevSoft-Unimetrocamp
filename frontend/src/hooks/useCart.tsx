import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../interfaces';
import { api } from '../services/api';

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  loadShoppingCart: (product: Product[]) => void;
  loading: boolean;
  handleLoading: (loading: boolean) => void;
}

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadShoppingCart = useCallback((products: Product[]) => {
    setCart(products);
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  const addProduct = async (productId: number) => {
    try {
      setLoading(true);

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
        setLoading(false);
        return;
      }

      if (productAlreadyInCart && product.amount <= productAlreadyInCart.qtd) {
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

  const removeProduct = async (productId: number) => {
    setLoading(true);
    try {
      const productExistInCart = cart.find(product => product.id === productId);
      if (!productExistInCart) {
        toast.error('Erro na remoção do produto');
        setLoading(false);
        return;
      }
      await api.delete<Product>(`/shoppingCart/${productExistInCart.id}`);
      const { data: products } = await api.get<Product[]>('/shoppingCart');
      setCart(products);
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
        loadShoppingCart,
        loading,
        handleLoading,
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
