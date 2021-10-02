import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { Products } from '../../interfaces';
import { api } from '../../services/api';
import { Container } from './styles';

interface CancelTicketProps {
  onCloseModal: () => void;
  isOpen: boolean;
  onProducts: (product: Products[]) => void;
  senha: string;
  password: string;
  setPassword: (value: string) => void;
}

export function CancelTicket({
  onCloseModal,
  isOpen,
  onProducts,
  senha,
  password,
  setPassword,
}: CancelTicketProps): JSX.Element {
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!password) {
        toast.error('Campo senha é obrigatório');
        return;
      }
      await api.delete(`/Bilhete/${senha}`);
      const { data } = await api.get('/Bilhete/listall');
      onProducts(data.result);
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
