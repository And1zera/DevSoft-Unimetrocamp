import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { Container } from './styles';

interface CancelTicketProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: number;
  onProducts: (product: Product[]) => void;
}

export function CancelTicket({
  onCloseModal,
  isOpen,
  id,
  onProducts,
}: CancelTicketProps): JSX.Element {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!password) {
        toast.error('Campo senha é obrigatório');
        return;
      }
      await api.delete(`/checkout/${id}`);
      const { data } = await api.get('checkout');
      onProducts(data);
      toast.success('Solicitação realizada');
      onCloseModal();
    } catch (err) {
      toast.error('Erro ao tentar fazer devolução');
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
        <h2>DEVOLVER BILHETE</h2>
        <input
          type="password"
          placeholder="Senha do bilhete"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} disabled={!password}>
          Devolver
        </button>
      </Container>
    </Modal>
  );
}
