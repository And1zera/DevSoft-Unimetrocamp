import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface HeaderProps {
  isColorActive: boolean;
  children?: React.ReactNode;
}

export function Header({ isColorActive, children }: HeaderProps): JSX.Element {
  return (
    <Container isColorActive={isColorActive}>
      <Link to="/" className="bilhet">
        BILHET
      </Link>
      <nav>
        {children}
        <button className="login" type="button">
          Entrar
        </button>
      </nav>
    </Container>
  );
}
