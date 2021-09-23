import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    text-align: right;
    margin-left: 12px;

    strong {
      display: block;
      color: var(--text-title);
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.5);
      }
    }

    span {
      font-size: 12px;
      color: var(--text-title);
      font-weight: 500;
    }
  }
`;
