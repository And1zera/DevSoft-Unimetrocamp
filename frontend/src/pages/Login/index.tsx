/* eslint-disable consistent-return */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import closeImg from '../../assets/close.svg';
import { useModal } from '../../hooks/useModal';
import { Container } from './styles';
import { api } from '../../services/api';
import { useAuthenticator } from '../../hooks/useAuthenticator';

interface User {
  email: string;
  password: string;
}

export function Login(): JSX.Element {
  const { handleCloseModal, isOpenModal } = useModal();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const { loadData } = useAuthenticator();
  const history = useHistory();

  const handleCloseModalAndClearStates = () => {
    setPassword('');
    setEmail('');
    handleCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await api.get<User[]>('http://localhost:3001/login');

      if (!email && !password) {
        toast.error('Campos email e senha são obrigatórios');
        return;
      }

      if (!email) {
        toast.error('Campo email é obrigatório');
        return;
      }

      if (!password) {
        toast.error('Campo senha é obrigatório');
        return;
      }

      if (!data.length) {
        toast.error('Usuário não encontrado');
        return;
      }

      data.map(user => {
        loadData(user.email, user.password);
        if (user.email !== email && user.password !== password) {
          toast.error('Usuário não identificado');
          return;
        }

        if (user.email !== email) {
          toast.error('Email ou senha inválidos');
          return;
        }

        if (user.password !== password) {
          toast.error('Email ou senha inválidos');
          return;
        }
        history.push('/bilhet/events');
        setEmail('');
        setPassword('');
        return handleCloseModal();
      });
    } catch (e) {
      toast.error('Usuário não identificado');
    }
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

        <button type="submit" onClick={handleSubmit}>
          Entrar
        </button>

        <Link to="/bilhet/cadastre-se" onClick={handleCloseModal}>
          <span>Não tem uma conta? </span> Cadastre-se
        </Link>
      </Container>
    </Modal>
  );
}
