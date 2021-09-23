import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.5rem 0;
  }
  input {
    width: 70%;
    height: 3rem;
    padding: 0 1.5rem;

    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-title);
    }
  }

  button[type='submit'] {
    width: 28%;
    padding: 0 1.5rem;
    height: 3rem;
    color: var(--white);
    background-color: var(--body);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
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

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 2rem;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  strong {
    color: #333;
    display: block;
  }
`;
