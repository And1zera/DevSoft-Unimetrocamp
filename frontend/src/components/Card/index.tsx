import React from 'react';
import { Container } from './styles';

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps): JSX.Element {
  return <Container>{children}</Container>;
}
