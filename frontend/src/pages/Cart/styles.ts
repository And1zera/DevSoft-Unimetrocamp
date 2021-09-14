import styled from 'styled-components';
import { darken, lighten } from 'polished';
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

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  > div {
    display: flex;
    align-items: center;
  }

  img {
    height: 100px;
    width: 180px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 1rem;
    font-weight: 500;
    & + span {
      margin-left: 0.5rem;
    }
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  .btn-modal {
    color: var(--body);
    font-size: 1rem;
    border: 0;
    padding: 0;

    & + button {
      margin-left: 1rem;
    }

    &:hover {
      color: ${darken(0.06, '#5519cc')};
    }
  }

  button {
    background: none;
    border: 0;

    padding: 6px;

    svg {
      color: #5519cc;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#5519cc')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#5519cc')};
        cursor: not-allowed;
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
