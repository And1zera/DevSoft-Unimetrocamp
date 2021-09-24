import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 0 3rem;
  margin: 3rem 0;
  background: var(--white);
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: var(--white);
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      margin: 0 1rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

export const Back = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-size: 0.9rem;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
