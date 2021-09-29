/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: number;
}

export function Participants({
  onCloseModal,
  isOpen,
  id,
}: ParticipantsProps): JSX.Element {
  const [rg, setRg] = useState('');
  const { cart, loadShoppingCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cart.map(async product => {
      if (id === product.id) {
        await api.put(`/shoppingCart/${id}`, { ...product, rg });
      }
    });
    const { data } = await api.get('/shoppingCart');
    loadShoppingCart(data);
    onCloseModal();
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
          <h2>INFORMAR PARTICIPANTE</h2>
          <input
            key={id}
            type="text"
            placeholder="RG do bilhete"
            value={rg}
            onChange={e => setRg(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
