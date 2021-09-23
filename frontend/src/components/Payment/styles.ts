import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap-reverse;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }

  .card__customer {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0 1rem;

    margin-bottom: 1rem;
  }

  .card__info {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    gap: 0 1rem;

    margin: 1rem 0;
  }

  input {
    width: 100%;
    height: 3.5rem;
    padding: 0 1.5rem;

    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-title);
    }
  }

  a {
    margin-top: 2rem;
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-self: center;
    align-items: center;
    font-weight: 600;
    color: #6606aa;
    span {
      color: var(--text-title);
      font-size: 1rem;
      margin-right: 0.5rem;
      font-weight: 500;
      cursor: text;
    }

    transition: filter 0.2s;

    :hover {
      filter: brightness(0.8);
    }
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 3.5rem;
    color: var(--white);
    background-color: #6606aa;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 2rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
