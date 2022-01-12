import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Back, Container } from './styles';

export function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [userName, setUserName] = useState('');

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

      if (!name) {
        toast.error('Nome é obrigatório');
        return;
      }

      if (!userName) {
        toast.error('Endereço é obrigatório');
        return;
      }
      await api.post('Usuario', {
        nome: name,
        cpf,
        login: userName,
        email,
        senha: password,
        fidelidade: 0,
      });
      toast.success('Usuário cadastrado com sucesso');
      setEmail('');
      setPassword('');
      setUserName('');
      setName('');
      setCpf('');
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
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome do seu Usuário"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        />
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
          disabled={!email || !password || !name || !userName}
          onClick={handleSubmit}
        >
          Cadastrar
        </button>
      </Container>
    </>
  );
}
