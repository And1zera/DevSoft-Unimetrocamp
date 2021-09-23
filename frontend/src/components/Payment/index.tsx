import React, { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { api } from '../../services/api';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
}

export function Payment({
  onCloseModal,
  isOpen,
}: ParticipantsProps): JSX.Element {
  const [customer, setCustomer] = useState('');
  const [cpf, setCPF] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [numberCard, setNumberCard] = useState('');

  const handleCloseModalAndClearStates = () => {
    onCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/Payment', {
      cpf,
      month,
      year,
      cvv,
      numberCard,
      customer,
    });
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModalAndClearStates}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModalAndClearStates}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <Content>
          <h2>PAGAMENTO</h2>
          <div className="card__customer">
            <input
              type="text"
              placeholder="Nome no cartão"
              onChange={e => setCustomer(e.target.value)}
              value={customer}
            />
            <input
              type="text"
              placeholder="CPF"
              onChange={e => setCPF(e.target.value)}
              value={cpf}
            />
          </div>
          <input
            type="text"
            placeholder="Numero do cartão"
            onChange={e => setNumberCard(e.target.value)}
            value={numberCard}
          />
          <div className="card__info">
            <input
              type="text"
              placeholder="MM"
              onChange={e => setMonth(e.target.value)}
              value={month}
            />
            <input
              type="text"
              placeholder="AAAA"
              onChange={e => setYear(e.target.value)}
              value={year}
            />
            <input
              type="text"
              placeholder="Código de segurança"
              onChange={e => setCvv(e.target.value)}
              value={cvv}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
