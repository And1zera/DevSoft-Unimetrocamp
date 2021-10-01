import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.form`
  max-width: 600px;
  margin: 3rem auto;
  padding: 5rem 2rem;
  border: 2px solid #f6f6f6;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);

  h1 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 400;
    text-align: center;
  }

  input {
    width: 100%;
    height: 3rem;
    padding: 0 1.5rem;

    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-title);
    }

    & + input {
      margin-top: 1.5rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
    color: var(--white);
    background-color: var(--body);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 2rem;

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
