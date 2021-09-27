import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Loading } from '../Loading';
import { ProductList } from './styles';

interface CartItemsAmount {
  [key: number]: number;
}

export function EventList(): JSX.Element {
  const { cart, addProduct, loadShoppingCart, loading, handleLoading } =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.qtd;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    const loadProducts = async () => {
      handleLoading(true);
      const { data } = await api.get('/products');
      const { data: cart } = await api.get('/shoppingCart');
      setProducts(data);
      loadShoppingCart(cart);
      handleLoading(false);
    };

    loadProducts();
  }, [loadShoppingCart, handleLoading]);

  const handleAddProduct = (productId: number) => {
    addProduct(productId);
  };

  return (
    <>
      <Loading loading={loading} />
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <div>
              <strong>{product.title}</strong>
              <div className="information_bilhet">
                <span>{product.location}</span>
                <span className="date">
                  {format(new Date(product.date), 'dd/MM/yyyy')}
                </span>
              </div>
              <div className="price">
                <div className="priceType">
                  <p>INTEIRA</p>
                  <span>{formatPrice(product.fullPrice)}</span>
                </div>
                <div className="priceType">
                  <p>MEIA</p>
                  <span>{formatPrice(product.halfPrice)}</span>
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
