import React from 'react';
import {
  MdBuild,
  MdSettingsBackupRestore,
  MdShoppingBasket,
} from 'react-icons/md';
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
        <Cart to="/bilhet/trocar-bilhete">
          <MdBuild size={26} color="var(--body)" />
          <div>
            <strong>Trocar Bilhete</strong>
          </div>
        </Cart>

        <Cart to="/bilhet/devolver-bilhete">
          <MdSettingsBackupRestore size={26} color="var(--body)" />
          <div>
            <strong> Devolver Bilhete</strong>
          </div>
        </Cart>
      </Card>
      <EventList />
    </>
  );
}
