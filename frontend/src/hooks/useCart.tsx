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

  const updatedProduct = useCallback(async (product: Product, qtd: number) => {
    await api.put<Product[]>(`/shoppingCart/${product.id}`, {
      ...product,
      qtd,
    });

    const { data } = await api.get<Product[]>('/shoppingCart');

    setCart([...data]);
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

      cart.map(product => {
        return product.id === productId
          ? updatedProduct(product, Number(product.qtd + 1))
          : product;
      });
      setLoading(false);
      toast.success('Produto adicionado ao carrinho');
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

  const updatedProductAmount = async ({
    productId,
    qtd,
  }: UpdatedProductAmount) => {
    try {
      setLoading(true);
      if (qtd < 1) {
        toast.error('Erro na alteração de quantidade do produto');
        setLoading(false);

        return;
      }
      const { data: products } = await api.get(`/products/${productId}`);
      const productAmount = products.amount;
      const stockNoExistInProduct = qtd > productAmount;

      if (stockNoExistInProduct) {
        toast.error('Quantidade solicitada fora de estoque');
        setLoading(false);

        return;
      }

      const productExistInCart = cart.find(product => product.id === productId);
      if (!productExistInCart) {
        toast.error('Erro na alteração de quantidade do produto');
        setLoading(false);

        return;
      }

      cart.map(product => {
        return product.id === productId
          ? updatedProduct(product, qtd)
          : product;
      });
      setLoading(false);
    } catch (err) {
      toast.error('Erro na alteração de quantidade do produto');
      setLoading(false);
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
