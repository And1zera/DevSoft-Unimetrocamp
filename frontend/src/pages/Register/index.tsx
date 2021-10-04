import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Back, Container } from './styles';

export function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!email) {
        toast.error('E-mail é obrigatório');
        return;
      }
      if (!password) {
        toast.error('Senha é obrigatório');
        return;
      }
      api.post('http://localhost:3001/login', { email, password });
      toast.success('Usuário cadastrado com sucesso');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error('Erro ao tentar cadastrar usuário');
    }
  };

  return (
    <>
      <Header isColorActive>
        <Back to="/bilhet/events" className="back">
          Lista de Eventos
        </Back>
      </Header>

      <Container>
        <h1> Crie sua conta na Bilhet </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!email || !password}
          onClick={handleSubmit}
        >
          Cadastrar
        </button>
      </Container>
    </>
  );
}
