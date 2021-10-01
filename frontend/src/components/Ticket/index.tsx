import React from 'react';
import Modal from 'react-modal';
import { ImQrcode } from 'react-icons/im';
import closeImg from '../../assets/close.svg';
import { formatPrice } from '../../utils/format';
import { Container } from './styles';
import { Tickets } from '../../interfaces';

interface TicketProps {
  onCloseModal: () => void;
  isOpen: boolean;
  ticket: Tickets | null;
}

export function Ticket({
  onCloseModal,
  isOpen,
  ticket,
}: TicketProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onCloseModal}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <h2>BILHETE</h2>
        <div>
          <div>
            <p>
              RG: <span> {ticket?.rg}</span>
            </p>
            <p>
              Preço: <span> {formatPrice(Number(ticket?.fullPrice))} </span>
            </p>
            <p>
              Senha: <span> 51511255</span>
            </p>
          </div>

          <div>
            <ImQrcode size={100} color="white" />
          </div>
        </div>
      </Container>
    </Modal>
  );
}
