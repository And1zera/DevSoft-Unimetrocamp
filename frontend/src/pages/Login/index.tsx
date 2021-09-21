import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import closeImg from '../../assets/close.svg';
import { useModal } from '../../hooks/useModal';
import { Container } from './styles';

export function Login(): JSX.Element {
  const { handleCloseModal, isOpenModal } = useModal();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');

  const handleCloseModalAndClearStates = () => {
    setPassword('');
    setEmail('');
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModalAndClearStates}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-login"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModalAndClearStates}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container>
        <h2>LOGIN</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit">Entrar</button>

        <Link to="cadastra-se">
          <span>Não tem uma conta? </span> Cadastre-se
        </Link>
      </Container>
    </Modal>
  );
}
