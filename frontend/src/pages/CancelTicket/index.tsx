import React from 'react';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Container, Back, Info, Table } from './styles';

export function CancelTicket(): JSX.Element {
  return (
    <>
      <Header isColorActive>
        <Back to="/bilhet/events" className="back">
          Lista de Eventos
        </Back>
      </Header>
      <Card>
        <Container>
          <h2> DEVOLVER BILHETE</h2>
          <div>
            <input type="text" placeholder="Senha do bilhete" />
            <button type="submit"> Pesquisar </button>
          </div>
        </Container>
      </Card>
      <Card>
        <Info>
          <Table>
            <thead>
              <tr>
                <th>RG Participante</th>
                <th>Bilhete</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>99999999-9</td>
                <td>Homem Aranha</td>
                <td>R$ 150,00</td>
              </tr>
            </tbody>
          </Table>
          <Container>
            <div className="container__btn-cancel">
              <button type="submit" className="btn__cancel">
                Devolver Bilhete
              </button>
            </div>
          </Container>
        </Info>
      </Card>
    </>
  );
}
