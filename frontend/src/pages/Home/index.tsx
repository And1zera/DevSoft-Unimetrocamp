import React from 'react';
import { Link } from 'react-router-dom';
import addCart from '../../assets/addCart.svg';
import { Header } from '../../components/Header';
import { Container, Content } from './styles';

export function Home(): JSX.Element {
  return (
    <Container>
      <Header isColorActive={false} />
      <Content>
        <div className="main">
          <h1>Bilheteria online que combina com você</h1>
          <p>
            Compre seus bilhetes de forma online sem precisar sair da sua casa
          </p>
          <Link to="/bilhet/events">Confira nossos eventos</Link>
        </div>
        <div className="addCartImg">
          <img src={addCart} alt="Adicionar ao carrinho" />
        </div>
      </Content>
    </Container>
  );
}
