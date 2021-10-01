import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CartList } from '../../components/CartList';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Participants } from '../../components/Participants';
import { Payment } from '../../components/Payment';
import { Ticket } from '../../components/Ticket';
import { useCart } from '../../hooks/useCart';
import { Tickets } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Container, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const { removeProduct, loading, cart } = useCart();
  const [isOpenParticipants, setIsOpenModalParticipants] = useState(false);
  const [isOpenPayment, setIsOpenModalPayment] = useState(false);
  const [isOpenModalTicket, setIsOpenModalTicket] = useState(false);
  const [typeTicket, setTypeTicket] = useState('fullPrice');
  const [isRgDisabled, setIsDisabled] = useState(true);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(true);
  const [ticket, setTicket] = useState<Tickets | null>(null);
  const [id, setId] = useState(0);

  const cartFormatted = cart.map(product => ({
    ...product,
    halfPriceFormatted: formatPrice(product.preco / 2),
    fullPriceFormatted: formatPrice(product.preco),
    subTotal:
      typeTicket === 'halfPrice'
        ? formatPrice((product.preco / 2) * product.qtd)
        : formatPrice(product.preco * product.qtd),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      if (typeTicket === 'halfPrice') {
        sumTotal += (product.preco / 2) * product.qtd;
        return sumTotal;
      }
      sumTotal += product.preco * product.qtd;
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
      let price = 0;
      cart.map(async product => {
        if (typeTicket === 'halfPrice') {
          price = product.preco / 2;
        } else {
          price = product.preco;
        }
        const { data } = await api.post('http://localhost:3001/checkout', {
          id: product.id,
          preco: price,
          rg: product.rg,
        });
        setTicket(data);
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
