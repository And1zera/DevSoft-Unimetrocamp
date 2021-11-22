import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductTable, Container } from './styles';
import { Header } from '../../components/Header';
import { Products, User } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Back } from '../Cart/styles';
import { Exchange } from '../Exchange';
import { CancelTicket } from '../CancelTicket';
import { Loading } from '../../components/Loading';
import { MyTickets } from './MyTickets';
import { useAuthenticator } from '../../hooks/useAuthenticator';

export function Ticket(): JSX.Element {
  const [products, setProducts] = useState<Products[]>([]);
  const [openModalExchange, setOpenModalExchange] = useState(false);
  const [openModalCancelTicket, setOpenModalCancelTicket] = useState(false);
  const [id, setId] = useState('');
  const { user } = useAuthenticator();
  const [senha, setSenha] = useState('');
  const [rg, setRg] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    try {
      const loadProducts = async () => {
        setLoading(true);
        const { data } = await api.get('/Bilhete/listall');
        setCartEmpty(
          !data.result.filter((result: Products) => result.ativo).length
        );
        const findUser = data.result.find(
          (customer: User) => customer.usuarioId === user.userId
        );
        setCartEmpty(!findUser);
        setProducts(data.result);
        setLoading(false);
      };
      loadProducts();
    } catch (e) {
      setLoading(false);
      toast.error('Erro ao obter os dados');
    }
  }, [user.userId]);

  const handleOpenModalExchange = (productId: string, senha: string) => {
    setOpenModalExchange(true);
    setId(productId);
    setSenha(senha);
  };

  const handleOpenModalCancelTicket = (senha: string) => {
    setOpenModalCancelTicket(true);
    setSenha(senha);
  };

  const handleOpenCloseModalExchange = () => {
    setOpenModalExchange(false);
    setRg('');
    setPassword('');
  };

  const handleCloseModalCancelTicket = () => {
    setOpenModalCancelTicket(false);
    setPassword('');
  };
  return (
    <>
      <Header isColorActive>
        <Back to="/bilhet/events" className="back">
          Lista de Eventos
        </Back>
      </Header>
      <Loading loading={loading} />
      <Container>
        {cartEmpty ? (
          <MyTickets cartEmpty={cartEmpty} />
        ) : (
          <>
            <Loading loading={loading} />
            <ProductTable>
              <thead>
                <tr>
                  <th aria-label="product image" />
                  <th>EVENTO</th>
                  <th>Preço</th>
                  <th>RG do Participante</th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  product =>
                    product.ativo &&
                    user.userId === product.usuarioId && (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.evento.urlImage}
                            alt={product.evento.titulo}
                          />
                        </td>
                        <td>
                          <strong>{product.evento.titulo}</strong>
                          <button
                            type="button"
                            className="btn-modal"
                            onClick={() =>
                              handleOpenModalExchange(product.id, product.senha)
                            }
                          >
                            Trocar Participante
                          </button>
                        </td>
                        <td>
                          <span>{formatPrice(product.preco)}</span>
                          <button
                            type="button"
                            className="btn-modal"
                            onClick={() =>
                              handleOpenModalCancelTicket(product.senha)
                            }
                          >
                            Devolver Bilhete
                          </button>
                        </td>
                        <td className="vertical-baseline">
                          <span>{product.rg}</span>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </ProductTable>
          </>
        )}
      </Container>
      <Exchange
        onCloseModal={handleOpenCloseModalExchange}
        isOpen={openModalExchange}
        id={id}
        senha={senha}
        onProducts={setProducts}
        rg={rg}
        setRg={setRg}
        password={password}
        setPassword={setPassword}
      />
      <CancelTicket
        setCartEmpty={setCartEmpty}
        onCloseModal={handleCloseModalCancelTicket}
        isOpen={openModalCancelTicket}
        senha={senha}
        onProducts={setProducts}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
}
