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

    .menu {
      background: none;
      border: 0;
      margin-left: 2rem;
      height: 33px;
      position: relative;

      .content {
        position: absolute;
        background: white;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        border-radius: 0.25rem;
        top: 180%;
        left: 0%;
        transform: translate(-60%, -40%);
        z-index: 100;
      }

      ul {
        width: 190px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        list-style: none;

        li {
          width: 100%;
          transition: background-color 0.2s;

          & + li {
            border-top: 1px solid #f6f6f6;
          }

          &:hover {
            background-color: #fafafa;
            border-radius: 0.25rem;
          }

          button {
            width: 100%;
            height: 100%;
            padding: 1rem;
            background-color: transparent;
            color: var(--text-title);
            font-weight: 600;
            font-size: 0.85rem;
            border: 0;
          }
        }
      }
    }
  }
`;
