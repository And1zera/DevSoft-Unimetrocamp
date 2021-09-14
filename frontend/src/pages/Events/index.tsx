import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { EventList } from '../../components/EventList';
import { Header } from '../../components/Header';
import { useCart } from '../../hooks/useCart';
import { Cart } from './styles';

export function Events(): JSX.Element {
  const { cart } = useCart();
  const cartSize = cart.length;
  return (
    <>
      <Header isColorActive>
        <Cart to="/bilhet/cart">
          <div>
            <strong>Meu Carrinho</strong>
            <span data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </Header>
      <EventList />
    </>
  );
}
