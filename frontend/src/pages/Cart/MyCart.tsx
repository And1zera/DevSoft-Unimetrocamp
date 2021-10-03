import React from 'react';
import myTicket from '../../assets/myTickets.svg';
import { Empty } from '../Ticket/styles';

interface MyCartProps {
  cartEmpty: boolean;
}

export function MyCart({ cartEmpty }: MyCartProps): JSX.Element {
  return (
    <Empty>
      {cartEmpty && (
        <>
          <img src={myTicket} alt="Meus bilhetes" width="500px" />
          <p className="title">Você não possui itens no carrinho</p>
        </>
      )}
    </Empty>
  );
}
