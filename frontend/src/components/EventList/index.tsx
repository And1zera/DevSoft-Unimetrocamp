import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';

interface CartItemsAmount {
  [key: number]: number;
}

export function EventList(): JSX.Element {
  const { cart, addProduct } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.qtd;
    return sumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await api.get('/products');
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddProduct = (productId: number) => {
    addProduct(productId);
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <div>
            <strong>{product.title}</strong>
            <div className="information_bilhet">
              <span>{product.location}</span>
              <span className="date">{product.date}</span>
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

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
