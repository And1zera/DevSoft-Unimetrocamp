import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Container, Back, Info, Table } from './styles';

export function Exchange(): JSX.Element {
  const [rg, setRg] = useState('');
  const [search, setSearch] = useState('');
  return (
    <>
      <Header isColorActive>
        <Back to="/bilhet/events" className="back">
          Lista de Eventos
        </Back>
      </Header>
      <Card>
        <Container>
          <h2> TROCAR BILHETE</h2>
          <div>
            <input
              type="text"
              placeholder="Senha do bilhete"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
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
            <div>
              <input
                type="text"
                placeholder="RG do novo participante"
                onChange={e => setRg(e.target.value)}
                value={rg}
              />
              <button type="submit"> Trocar </button>
            </div>
          </Container>
        </Info>
      </Card>
    </>
  );
}
