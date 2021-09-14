import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  background: none;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: var(--white);
    }

    span {
      font-size: 12px;
      color: var(--white);
    }
  }
`;
