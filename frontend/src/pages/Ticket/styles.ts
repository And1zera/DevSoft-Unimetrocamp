import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 3rem;
  margin: 3rem auto;
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 5px 0;
    letter-spacing: 2px;
  }

  tbody td {
    padding: 2rem 0;
    border-bottom: 1px solid #eee;
  }

  .vertical-baseline {
    vertical-align: baseline;
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
  button {
    background: #7159c1;
    color: var(--white);
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    margin: 2rem 0rem 0;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    color: var(--text-title);
  }

  .title {
    font-weight: 500;
  }
`;
