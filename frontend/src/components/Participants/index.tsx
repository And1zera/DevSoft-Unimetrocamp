/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import closeImg from '../../assets/close.svg';
import { useCart } from '../../hooks/useCart';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
  id: string;
  onIsRgExist: (value: boolean) => void;
}

export function Participants({
  onCloseModal,
  isOpen,
  id,
  onIsRgExist,
}: ParticipantsProps): JSX.Element {
  const [rg, setRg] = useState('');
  const { cart, setCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rg) {
      toast.error('Campo RG é obrigatório');
      return;
    }
    cart.map(product => {
      setCart([{ ...product, rg }]);
      localStorage.setItem('cart', JSON.stringify([{ ...product, rg }]));
      return 0;
    });

    onIsRgExist(false);
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
          <button type="submit" onClick={handleSubmit} disabled={!rg}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
