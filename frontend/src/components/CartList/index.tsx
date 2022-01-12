import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Product } from '../../interfaces';
import { ProductTable } from './styles';

interface ProductFormatted extends Product {
  fullPriceFormatted: string;
  halfPriceFormatted: string;
  subTotal: string;
}

interface CartListProps {
  cart: ProductFormatted[];
  handleOpenModal: (id: string) => void;
  handleRemoveProduct: (id: string) => void;
  onTypeTicket: (value: string) => void;
  onTypeLoyalty: (value: string) => void;
  fidelidade: number | undefined;
}

export function CartList({
  cart,
  handleOpenModal,
  handleRemoveProduct,
  onTypeTicket,
  fidelidade,
  onTypeLoyalty,
}: CartListProps): JSX.Element {
  return (
    <ProductTable>
      <thead>
        <tr>
          <th aria-label="product image" />
          <th>EVENTO</th>
          <th>QTD</th>
          <th>Tipo do bilhete</th>
          {fidelidade === 1 && <th>Usar pontuação</th>}
          <th>SUBTOTAL</th>
          <th aria-label="delete icon" />
        </tr>
      </thead>
      <tbody>
        {cart.map(product => (
          <tr key={product.id}>
            <td>
              <img src={product.urlImage} alt={product.titulo} />
            </td>
            <td>
              <strong>{product.titulo}</strong>
              <div>
                <span>Inteira: {product.fullPriceFormatted}</span>
                <span>Meia: {product.halfPriceFormatted}</span>
              </div>
              <button
                type="button"
                className="btn-modal"
                onClick={() => handleOpenModal(product.id)}
              >
                Informar Participante
              </button>
            </td>
            <td>
              <div>
                <span>{product.qtd} UN</span>
              </div>
            </td>
            <td>
              <select
                name="optTypeTicket"
                id="optTypeTicket"
                onChange={e => onTypeTicket(e.target.value)}
              >
                <option value="fullPrice">INTEIRA</option>
                <option value="halfPrice">MEIA</option>
              </select>
            </td>
            {fidelidade === 1 && (
              <td>
                <select
                  name="optLoyalty"
                  id="optLoyalty"
                  onChange={e => onTypeLoyalty(e.target.value)}
                  defaultValue="no"
                >
                  <option value="yes">SIM</option>
                  <option value="no">NÃO</option>
                </select>
              </td>
            )}
            <td>
              <strong>{product.subTotal}</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete
                  size={20}
                  onClick={() => handleRemoveProduct(product.id)}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </ProductTable>
  );
}
