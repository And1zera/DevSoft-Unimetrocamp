import React from 'react';
import myTicket from '../../assets/cartEmpty.svg';
import { Empty } from './styles';

interface MyTicketsProps {
  cartEmpty: boolean;
}

export function MyTickets({ cartEmpty }: MyTicketsProps): JSX.Element {
  return (
    <Empty>
      {cartEmpty && (
        <>
          <img src={myTicket} alt="Meus bilhetes" width="500px" />
          <p className="title"> Você não possui bilhetes comprados</p>
          <p>Fique atento, aqui você vai encontrar </p>
          <p>todos seus bilhetes.</p>
        </>
      )}
    </Empty>
  );
}
