import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
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
