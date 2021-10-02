import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Loading } from '../Loading';
import { ProductList } from './styles';

interface CartItemsAmount {
  [key: string]: number;
}

export function EventList(): JSX.Element {
  const { cart, addProduct, loading, handleLoading } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.qtd;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    try {
      handleLoading(true);
      const loadProducts = async () => {
        const { data } = await api.get('/Evento/listall');
        setProducts(data.result);
        handleLoading(false);
      };
      loadProducts();
    } catch (e) {
      toast.error('Erro ao obter os dados');
      handleLoading(false);
    }
  }, [handleLoading]);

  const handleAddProduct = (productId: string) => {
    if (cart.length === 1) {
      toast.warning('Já existe um produto no carrinho!');
      return;
    }
    addProduct(productId);
  };

  return (
    <>
      <Loading loading={loading} />
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.urlImage} alt={product.titulo} />
            <div>
              <strong>{product.titulo}</strong>
              <div className="information_bilhet">
                <span>{product.endereco}</span>
                <span className="date">
                  {format(new Date(product.data), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              <div className="price">
                <div className="priceType">
                  <p>INTEIRA</p>
                  <span>{formatPrice(product.preco)}</span>
                </div>
                <div className="priceType">
                  <p>MEIA</p>
                  <span>{formatPrice(product.preco / 2)}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAddProduct(product.id)}
              disabled={loading}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  );
}
