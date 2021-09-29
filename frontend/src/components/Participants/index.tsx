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
  const [rgs, setRgs] = useState('');
  const { cart, loadShoppingCart } = useCart();

  const handleChangeRg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rg = e.target.value;
    setRgs(rg);
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cart.map(async product => {
      if (id === product.id) {
        await api.put(`/shoppingCart/${id}`, { ...product, rgs });
      }
    });
    const { data } = await api.get('/shoppingCart');
    loadShoppingCart(data);
    setRgs('');
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModal}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <Content>
          <h2>INFORMAR PARTICIPANTES</h2>
          {cart.map(
            product =>
              product.id === id && (
                <input
                  key={product.id}
                  type="text"
                  placeholder="RG do bilhete"
                  value={product.rgs}
                  onChange={e => handleChangeRg(e)}
                />
              )
          )}
          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
