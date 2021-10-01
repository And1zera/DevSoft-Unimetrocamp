import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Back, Container } from './styles';

export function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <button type="submit" disabled={!email || !password}>
          Cadastrar
        </button>
      </Container>
    </>
  );
}
