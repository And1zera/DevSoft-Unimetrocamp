import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CartList } from '../../components/CartList';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { ModalTicket } from '../../components/ModalTicket';
import { Participants } from '../../components/Participants';
import { Payment } from '../../components/Payment';
import { useAuthenticator } from '../../hooks/useAuthenticator';
import { useCart } from '../../hooks/useCart';
import { useModal } from '../../hooks/useModal';
import { Tickets } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { MyCart } from './MyCart';
import { Container, Total, Back } from './styles';

export function Cart(): JSX.Element {
  const { removeProduct, loading, cart, setCart } = useCart();
  const { user } = useAuthenticator();
  const { handleOpenModal } = useModal();
  const [isOpenParticipants, setIsOpenModalParticipants] = useState(false);
  const [isOpenPayment, setIsOpenModalPayment] = useState(false);
  const [isOpenModalTicket, setIsOpenModalTicket] = useState(false);
  const [typeTicket, setTypeTicket] = useState('fullPrice');
  const [typeLoyalty, setTypeLoyalty] = useState('no');
  const [isRgDisabled, setIsDisabled] = useState(true);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(true);
  const [ticket, setTicket] = useState<Tickets | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [id, setId] = useState('');
  const cartSize = cart.length;

  useEffect(() => {
    if (!cartSize) {
      setCartEmpty(true);
    }
  }, [cartSize]);

  const calculePrice = (price: number, qtd: number) => {
    if (typeLoyalty === 'yes' && typeTicket === 'halfPrice') {
      return formatPrice((price / 2) * qtd - 5);
    }

    if (typeTicket === 'halfPrice') {
      return formatPrice((price / 2) * qtd);
    }

    if (typeLoyalty === 'yes' && typeTicket === 'fullPrice') {
      return formatPrice(price * qtd - 5);
    }

    return formatPrice(price * qtd);
  };

  const cartFormatted = cart.map(product => ({
    ...product,
    halfPriceFormatted: formatPrice(product.preco / 2),
    fullPriceFormatted: formatPrice(product.preco),
    subTotal: calculePrice(product.preco, product.qtd),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      if (typeLoyalty === 'yes' && typeTicket === 'halfPrice') {
        sumTotal += (product.preco / 2) * product.qtd - 5;
        return sumTotal;
      }

      if (typeTicket === 'halfPrice') {
        sumTotal += (product.preco / 2) * product.qtd;
        return sumTotal;
      }

      if (typeLoyalty === 'yes') {
        sumTotal += product.preco - 5;
        return sumTotal;
      }

      sumTotal += product.preco * product.qtd;
      return sumTotal;
    }, 0)
  );

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const handleOpenModalParticipants = (productId: string) => {
    setIsOpenModalParticipants(true);
    setId(productId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!user.email && !user.password) {
        toast.warning('Necessário estar logado para finalizar a compra');
        handleOpenModal();
        return;
      }
      let price = 0;
      cart.map(async product => {
        if (typeLoyalty === 'yes' && typeTicket === 'halfPrice') {
          price = (product.preco / 2) * product.qtd - 5;
        }

        if (typeTicket === 'halfPrice' && typeLoyalty === 'no') {
          price = (product.preco / 2) * product.qtd;
        }

        if (typeLoyalty === 'yes' && typeTicket === 'fullPrice') {
          price = product.preco * product.qtd - 5;
        }

        if (typeTicket === 'fullPrice' && typeLoyalty === 'no') {
          price = product.preco;
        }

        const { data } = await api.post('/Bilhete', {
          Eventoid: product.id,
          Preco: price,
          RG: product.rg,
        });
        setTicket(data);
      });
      toast.success('Venda finalizada!');
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
      setDisabled(true);
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
        {cartEmpty ? (
          <MyCart cartEmpty={cartEmpty} />
        ) : (
          <>
            <CartList
              handleRemoveProduct={handleRemoveProduct}
              handleOpenModal={handleOpenModalParticipants}
              onTypeTicket={setTypeTicket}
              onTypeLoyalty={setTypeLoyalty}
              cart={cartFormatted}
            />
            <footer>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isRgDisabled || isPaymentDisabled || disabled}
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
          </>
        )}
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

        <ModalTicket
          isOpen={isOpenModalTicket}
          onCloseModal={() => setIsOpenModalTicket(false)}
          ticket={ticket}
        />
      </Container>
    </>
  );
}
