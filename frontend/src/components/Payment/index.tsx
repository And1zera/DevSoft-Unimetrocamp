import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { api } from '../../services/api';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
  onIsPaymentDisabled: (value: boolean) => void;
}

export function Payment({
  onCloseModal,
  isOpen,
  onIsPaymentDisabled,
}: ParticipantsProps): JSX.Element {
  const [dataBank, setDataBank] = useState({
    customer: '',
    cpf: '',
    month: '',
    year: '',
    cvv: '',
    numberCard: '',
  });

  const id = Math.floor(Math.random() * 12056);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !dataBank.customer &&
        !dataBank.cvv &&
        !dataBank.month &&
        !dataBank.numberCard &&
        !dataBank.year &&
        !dataBank.cpf
      ) {
        toast.error('Todos os campos são obrigatórios');
        return;
      }

      await api.post('http://localhost:3001/payment', {
        id,
        ...dataBank,
      });
      onIsPaymentDisabled(false);
      onCloseModal();
    } catch (err) {
      toast.error('Erro ao cadastrar pagamento');
    }
  };

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
        <Content>
          <h2>PAGAMENTO</h2>
          <div className="card__customer">
            <input
              type="text"
              placeholder="Nome no cartão"
              onChange={e =>
                setDataBank({ ...dataBank, customer: e.target.value })
              }
              value={dataBank.customer}
            />
            <input
              type="text"
              placeholder="CPF"
              onChange={e => setDataBank({ ...dataBank, cpf: e.target.value })}
              value={dataBank.cpf}
            />
          </div>
          <input
            type="text"
            placeholder="Numero do cartão"
            onChange={e =>
              setDataBank({ ...dataBank, numberCard: e.target.value })
            }
            value={dataBank.numberCard}
          />
          <div className="card__info">
            <input
              type="text"
              placeholder="MM"
              onChange={e =>
                setDataBank({ ...dataBank, month: e.target.value })
              }
              value={dataBank.month}
            />
            <input
              type="text"
              placeholder="AAAA"
              onChange={e => setDataBank({ ...dataBank, year: e.target.value })}
              value={dataBank.year}
            />
            <input
              type="text"
              placeholder="Código de segurança"
              onChange={e => setDataBank({ ...dataBank, cvv: e.target.value })}
              value={dataBank.cvv}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !dataBank.customer ||
              !dataBank.cvv ||
              !dataBank.month ||
              !dataBank.numberCard ||
              !dataBank.year ||
              !dataBank.cpf
            }
          >
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
