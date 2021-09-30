import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { Container } from './styles';

interface ExchangeProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: number;
  onProducts: (product: Product[]) => void;
}

export function Exchange({
  onCloseModal,
  isOpen,
  id,
  onProducts,
}: ExchangeProps): JSX.Element {
  const [rg, setRg] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!rg && !password) {
        toast.error('Campos RG e Senha são obrigatório');
        return;
      }
      if (!rg) {
        toast.error('Campo RG é obrigatório');
        return;
      }

      if (!password) {
        toast.error('Campo senha é obrigatório');
        return;
      }
      await api.put(`/checkout/${id}`, { rg });
      const { data } = await api.get('checkout');
      onProducts(data);
      toast.success('Alterado com sucesso');
      onCloseModal();
    } catch (err) {
      toast.error('Erro ao tentar alterar');
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
        <h2>TROCAR PARTICIPANTE</h2>
        <input
          type="password"
          placeholder="Senha do bilhete"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Novo RG"
          value={rg}
          onChange={e => setRg(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!rg || !password}
        >
          Enviar
        </button>
      </Container>
    </Modal>
  );
}
