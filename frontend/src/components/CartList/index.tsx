import React from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';
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
  handleProductDecrement: (product: Product) => void;
  handleProductIncrement: (product: Product) => void;
  handleRemoveProduct: (id: number) => void;
}

export function CartList({
  cart,
  handleOpenModal,
  handleProductDecrement,
  handleProductIncrement,
  handleRemoveProduct,
}: CartListProps): JSX.Element {
  return (
    <ProductTable>
      <thead>
        <tr>
          <th aria-label="product image" />
          <th>EVENTO</th>
          <th>QTD</th>
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
                <button
                  type="button"
                  disabled={product.qtd <= 1}
                  onClick={() => handleProductDecrement(product)}
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <input type="text" readOnly value={product.qtd} />
                <button
                  type="button"
                  onClick={() => handleProductIncrement(product)}
                >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
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
