import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductTable, Container } from './styles';
import { Header } from '../../components/Header';
import { Product } from '../../interfaces';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { Back } from '../Cart/styles';
import { Exchange } from '../Exchange';
import { CancelTicket } from '../CancelTicket';
import { Loading } from '../../components/Loading';

export function Ticket(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModalExchange, setOpenModalExchange] = useState(false);
  const [openModalCancelTicket, setOpenModalCancelTicket] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const loadProducts = async () => {
        setLoading(true);
        const { data } = await api.get('/checkout');
        setProducts(data);
        setLoading(false);
      };
      loadProducts();
    } catch (e) {
      setLoading(false);
      toast.error('Erro ao obter os dados');
    }
  }, []);

  const handleOpenModalExchange = (productId: number) => {
    setOpenModalExchange(true);
    setId(productId);
  };

  const handleOpenModalCancelTicket = (productId: number) => {
    setOpenModalCancelTicket(true);
    setId(productId);
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
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <button
                    type="button"
                    className="btn-modal"
                    onClick={() => handleOpenModalExchange(product.id)}
                  >
                    Trocar Participante
                  </button>
                </td>
                <td>
                  <span>{formatPrice(product.fullPrice)}</span>
                  <button
                    type="button"
                    className="btn-modal"
                    onClick={() => handleOpenModalCancelTicket(product.id)}
                  >
                    Devolver Bilhete
                  </button>
                </td>
                <td className="vertical-baseline">
                  <span>{product.rg}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Container>
      <Exchange
        onCloseModal={() => setOpenModalExchange(false)}
        isOpen={openModalExchange}
        id={id}
        onProducts={setProducts}
      />
      <CancelTicket
        onCloseModal={() => setOpenModalCancelTicket(false)}
        isOpen={openModalCancelTicket}
        id={id}
        onProducts={setProducts}
      />
    </>
  );
}
