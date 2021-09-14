import React from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { Header } from '../../components/Header';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { formatPrice } from '../../utils/format';
import { Container, ProductTable, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const { cart, removeProduct, updatedProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    halfPriceFormatted: formatPrice(product.halfPrice),
    fullPriceFormatted: formatPrice(product.fullPrice),
    subTotal: formatPrice(product.fullPrice * product.qtd),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.fullPrice * product.qtd;
      return sumTotal;
    }, 0)
  );

  const handleProductIncrement = (product: Product) => {
    const incrementArguments = {
      productId: product.id,
      qtd: product.qtd + 1,
    };

    updatedProductAmount(incrementArguments);
  };

  const handleProductDecrement = (product: Product) => {
    const decrementArguments = {
      productId: product.id,
      qtd: product.qtd - 1,
    };
    updatedProductAmount(decrementArguments);
  };

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId);
  };

  return (
    <>
      <Header isColorActive>
        <Back to="/bilhet/events" className="back">
          Lista de Eventos
        </Back>
      </Header>
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>EVENTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cartFormatted.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <div>
                    <span>Inteira: {product.fullPriceFormatted}</span>
                    <span>Meia: {product.halfPriceFormatted}</span>
                  </div>
                  <button type="button" className="btn-modal">
                    Informar Participantes
                  </button>
                  <button type="button" className="btn-modal">
                    Forma de Pagamento
                  </button>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      disabled={product.qtd <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input type="text" readOnly value={product.qtd} />
                    <button
                      type="button"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button type="button">
                    <MdDelete
                      size={20}
                      onClick={() => handleRemoveProduct(product.id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
    </>
  );
}
