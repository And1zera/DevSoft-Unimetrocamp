import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthenticator } from '../../hooks/useAuthenticator';
import { useModal } from '../../hooks/useModal';
import { Container } from './styles';

interface HeaderProps {
  isColorActive: boolean;
  children?: React.ReactNode;
}

export function Header({ isColorActive, children }: HeaderProps): JSX.Element {
  const { handleOpenModal } = useModal();
  const { user, loadData } = useAuthenticator();
  const history = useHistory();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    loadData('', '');
    history.push('/');
  };

  return (
    <Container isColorActive={isColorActive}>
      <Link to="/" className="bilhet">
        BILHET
      </Link>
      <nav>
        {children}
        {user.email && user.password ? (
          <button className="login" type="button" onClick={handleLogout}>
            Sair
          </button>
        ) : (
          <button className="login" type="button" onClick={handleOpenModal}>
            Entrar
          </button>
        )}
      </nav>
    </Container>
  );
}
