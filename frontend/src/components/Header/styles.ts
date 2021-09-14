import styled from 'styled-components';

interface ContainerProps {
  isColorActive: boolean;
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${props =>
    props.isColorActive &&
    'linear-gradient(150deg, var(--body) 0%, var(--body-base) 100%) no-repeat'};
  padding: 1rem 3rem;

  .bilhet {
    letter-spacing: 5px;
    color: var(--white);
    font-size: 1.2rem;
    font-weight: 500;
    text-decoration: none;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
      display: flex;
      align-items: center;
      color: var(--white);
      text-decoration: none;
      background-color: #6606aa;
      padding: 0 2rem;
      font-size: 0.8rem;
      height: 1.5rem;
      border-radius: 0.5rem;
      border: none;
      margin-left: 2rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
