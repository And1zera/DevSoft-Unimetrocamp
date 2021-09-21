import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Participants } from '../../components/Participants';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Container, ProductTable, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const {
    removeProduct,
    updatedProductAmount,
    loadShoppingCart,
    loading,
    cart,
  } = useCart();
  const [isOpen, setIsOpenModal] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/shoppingCart');
      loadShoppingCart(data);
    } catch (e) {
      toast.error('Erro ao obter os dados');
    }
  }, [loadShoppingCart]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Loading loading={loading} />
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
                  <button
                    type="button"
                    className="btn-modal"
                    onClick={handleOpenModal}
                  >
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

        <Participants isOpen={isOpen} onCloseModal={handleCloseModal} />
      </Container>
    </>
  );
}
