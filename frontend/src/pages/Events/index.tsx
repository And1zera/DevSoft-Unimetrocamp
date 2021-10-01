import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import { Card } from '../../components/Card';
import { EventList } from '../../components/EventList';
import { Header } from '../../components/Header';
import { useCart } from '../../hooks/useCart';
import { Cart } from './styles';

export function Events(): JSX.Element {
  const { cart } = useCart();
  const cartSize = cart.length;
  return (
    <>
      <Header isColorActive />
      <Card>
        <Cart to="/bilhet/cart">
          <MdShoppingBasket size={36} color="var(--body)" />
          <div>
            <strong>Meu Carrinho</strong>
            <span>
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </span>
          </div>
        </Cart>

        <Cart to="/bilhet/meus-bilhetes">
          <FaAddressCard size={26} color="var(--body)" />
          <div>
            <strong>Meus Bilhete</strong>
          </div>
        </Cart>
      </Card>
      <EventList />
    </>
  );
}
