import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { Header } from '../../components/Header';
import { Cart } from './styles';

export function Events(): JSX.Element {
  return (
    <>
      <Header isColorActive>
        <Cart to="/bilhet/cart">
          <div>
            <strong>Meu Carrinho</strong>
            <span data-testid="cart-size">0</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </Header>
    </>
  );
}
