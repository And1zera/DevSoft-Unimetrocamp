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
  handleOpenModal: (id: number) => void;
  handleRemoveProduct: (id: number) => void;
  onTypeTicket: (value: string) => void;
}

export function CartList({
  cart,
  handleOpenModal,
  handleRemoveProduct,
  onTypeTicket,
}: CartListProps): JSX.Element {
  return (
    <ProductTable>
      <thead>
        <tr>
          <th aria-label="product image" />
          <th>EVENTO</th>
          <th>QTD</th>
          <th>Tipo do bilhete</th>
          <th>SUBTOTAL</th>
          <th aria-label="delete icon" />
        </tr>
      </thead>
      <tbody>
        {cart.map(product => (
          <tr key={product.id}>
            <td>
              <img src={product.image} alt={product.title} />
            </td>
            <td>
              <strong>{product.title}</strong>
              <div>
                <span>Inteira: {product.fullPriceFormatted}</span>
                <span>Meia: {product.halfPriceFormatted}</span>
              </div>
              <button
                type="button"
                className="btn-modal"
                onClick={() => handleOpenModal(product.id)}
              >
                Informar Participantes
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
