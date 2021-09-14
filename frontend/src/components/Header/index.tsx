import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { Container } from './styles';

interface HeaderProps {
  isColorActive: boolean;
  children?: React.ReactNode;
}

export function Header({ isColorActive, children }: HeaderProps): JSX.Element {
  const { handleOpenModal } = useModal();

  return (
    <Container isColorActive={isColorActive}>
      <Link to="/" className="bilhet">
        BILHET
      </Link>
      <nav>
        {children}
        <button className="login" type="button" onClick={handleOpenModal}>
          Entrar
        </button>
      </nav>
    </Container>
  );
}
