import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { ProductList } from './styles';

export function EventList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await api.get('/products');
      setProducts(data);
    };

    loadProducts();
  }, []);

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
                <span>{product.fullPrice}</span>
              </div>
              <div className="priceType">
                <p>MEIA</p>
                <span>{product.halfPrice}</span>
              </div>
            </div>
          </div>

          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />0
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
