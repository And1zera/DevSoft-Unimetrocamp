import React from 'react';
import { Container } from './styles';
import spinner from '../../assets/spinner.svg';

interface LoadingProps {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps): JSX.Element {
  return (
    <>
      {loading && (
        <Container>
          <img src={spinner} alt="Loading" />
        </Container>
      )}
    </>
  );
}
