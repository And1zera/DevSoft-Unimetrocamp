import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: linear-gradient(120deg, var(--body) 0%, var(--body-base) 100%)
    no-repeat;
`;

export const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 3rem 3rem;

  .addCartImg {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 450px;
      width: 450px;
    }
  }

  .main {
    display: flex;
    justify-content: center;
    flex-direction: column;

    h1,
    p {
      color: var(--white);
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 2.5rem;
      width: 100%;
    }

    p {
      font-weight: 400;
      font-size: 1.5rem;
      margin-top: 1rem;
    }

    a {
      width: 90%;
      height: 3rem;
      margin-top: 2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: var(--white);
      text-decoration: none;
      background-color: #6606aa;
      border-radius: 1rem;
      padding: 0 5rem;

      transition: 0.2s;

      & + a {
        margin-top: 5rem;
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
