import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CartList } from '../../components/CartList';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Participants } from '../../components/Participants';
import { Payment } from '../../components/Payment';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Container, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const {
    removeProduct,
    updatedProductAmount,
    loadShoppingCart,
    loading,
    cart,
  } = useCart();
  const [isOpenParticipants, setIsOpenModalParticipants] = useState(false);
  const [isOpenPayment, setIsOpenModalPayment] = useState(false);
  const [id, setId] = useState(0);

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

  const handleOpenModal = (productId: number) => {
    setIsOpenModalParticipants(true);
    setId(productId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data: payment } = await api.get('/payment');
      await api.post('/checkout', { payment, products: cart });
      toast.success('Venda finalizada!');
    } catch (err) {
      toast.error('Erro ao finalizar compra');
    }
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
        <CartList
          handleProductIncrement={handleProductIncrement}
          handleProductDecrement={handleProductDecrement}
          handleRemoveProduct={handleRemoveProduct}
          handleOpenModal={handleOpenModal}
          cart={cartFormatted}
        />
        <footer>
          <button type="button" onClick={handleSubmit}>
            Finalizar pedido
          </button>
          <button
            type="button"
            className="btn-modal"
            onClick={() => setIsOpenModalPayment(true)}
          >
            Forma de Pagamento
          </button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>

        <Participants
          isOpen={isOpenParticipants}
          onCloseModal={() => setIsOpenModalParticipants(false)}
          id={id}
        />
        <Payment
          isOpen={isOpenPayment}
          onCloseModal={() => setIsOpenModalPayment(false)}
        />
      </Container>
    </>
  );
}
