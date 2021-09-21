import React, { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
}

export function Participants({
  onCloseModal,
  isOpen,
}: ParticipantsProps): JSX.Element {
  const [RG, setRG] = useState('');

  const handleCloseModalAndClearStates = () => {
    setRG('');
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
          <h2>INFORMAR PARTICIPANTES</h2>

          <input
            type="text"
            placeholder="Informe o RG do bilhete"
            value={RG}
            onChange={event => setRG(event.target.value)}
          />

          <button type="submit">Salvar</button>
        </Content>
      </Container>
    </Modal>
  );
}
