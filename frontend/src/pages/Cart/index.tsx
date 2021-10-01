import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CartList } from '../../components/CartList';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Participants } from '../../components/Participants';
import { Payment } from '../../components/Payment';
import { Ticket } from '../../components/Ticket';
import { useCart } from '../../hooks/useCart';
import { Product, Tickets } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Container, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const { removeProduct, loadShoppingCart, loading, cart } = useCart();
  const [isOpenParticipants, setIsOpenModalParticipants] = useState(false);
  const [isOpenPayment, setIsOpenModalPayment] = useState(false);
  const [isOpenModalTicket, setIsOpenModalTicket] = useState(false);
  const [typeTicket, setTypeTicket] = useState('fullPrice');
  const [isRgDisabled, setIsDisabled] = useState(true);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(true);
  const [ticket, setTicket] = useState<Tickets | null>(null);
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
    halfPriceFormatted: formatPrice(product.fullPrice / 2),
    fullPriceFormatted: formatPrice(product.fullPrice),
    subTotal:
      typeTicket === 'halfPrice'
        ? formatPrice((product.fullPrice / 2) * product.qtd)
        : formatPrice(product.fullPrice * product.qtd),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      if (typeTicket === 'halfPrice') {
        sumTotal += (product.fullPrice / 2) * product.qtd;
        return sumTotal;
      }
      sumTotal += product.fullPrice * product.qtd;
      return sumTotal;
    }, 0)
  );

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
      const { data: carts } = await api.get<Product[]>('/shoppingCart');
      carts.map(async product => {
        if (typeTicket === 'halfPrice') {
          const price = product.fullPrice / 2;
          const { data } = await api.post('/checkout', {
            id: product.id,
            fullPrice: price,
            rg: product.rg,
          });
          setTicket(data);
        } else {
          const { data } = await api.post('/checkout', {
            id: product.id,
            fullPrice: product.fullPrice,
            rg: product.rg,
          });
          setTicket(data);
        }
      });
      toast.success('Venda finalizada!');
      setIsOpenModalTicket(true);
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
          handleRemoveProduct={handleRemoveProduct}
          handleOpenModal={handleOpenModal}
          onTypeTicket={setTypeTicket}
          cart={cartFormatted}
        />
        <footer>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isRgDisabled || isPaymentDisabled}
          >
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
          onIsRgExist={setIsDisabled}
          id={id}
        />
        <Payment
          isOpen={isOpenPayment}
          onIsPaymentDisabled={setIsPaymentDisabled}
          onCloseModal={() => setIsOpenModalPayment(false)}
        />

        <Ticket
          isOpen={isOpenModalTicket}
          onCloseModal={() => setIsOpenModalTicket(false)}
          ticket={ticket}
        />
      </Container>
    </>
  );
}
