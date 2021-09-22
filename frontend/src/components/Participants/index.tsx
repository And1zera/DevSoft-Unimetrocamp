import React from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Participant } from '../../interfaces';
import { api } from '../../services/api';
import { Container, Content } from './styles';

interface ParticipantsProps {
  onCloseModal: () => void;
  isOpen: boolean;
  rgParticipants: Participant[];
  onRgParticipants: (product: Participant[]) => void;
}

export function Participants({
  onCloseModal,
  isOpen,
  rgParticipants,
  onRgParticipants,
}: ParticipantsProps): JSX.Element {
  const handleCloseModalAndClearStates = () => {
    onCloseModal();
  };

  const handleChangeRg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    rgParticipants[index].RG = e.target.value;
    rgParticipants[index].codigo = Math.floor(Math.random() * 1568); // tirar depois da integração
    onRgParticipants([...rgParticipants]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    rgParticipants.map(async rg => {
      await api.post('/participants', {
        rg: rg.RG,
        id: rg.codigo,
        eventId: rg.eventId,
      });
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
          <h2>INFORMAR PARTICIPANTES</h2>
          {rgParticipants.map((product, index: number) => (
            <input
              key={Number(index)}
              type="text"
              placeholder={`${index + 1}º RG do bilhete `}
              value={product.RG}
              onChange={e => handleChangeRg(e, index)}
            />
          ))}
          <button type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </Content>
      </Container>
    </Modal>
  );
}
