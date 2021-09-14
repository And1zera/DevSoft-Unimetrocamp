import styled from 'styled-components';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  list-style: none;
  margin: 4rem auto;
  max-width: 1280px;

  li {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background: #fafafa;
    width: 350px;
    margin: 0 auto;

    img {
      pointer-events: none;
      user-select: none;
      border-radius: 8px 8px 0px 0px;
    }

    > div {
      display: flex;
      flex-direction: column;

      > strong {
        font-size: 1.2rem;
        line-height: 1.5rem;
        letter-spacing: 0.3rem;
        color: #333;
        margin-top: 1rem;
        padding: 0 1.5rem;
      }

      .information_bilhet {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 1.5rem;

        span {
          font-weight: 500;
          color: #6e6e6e;
        }

        .date {
          font-size: 0.8rem;
        }
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;

        .priceType {
          display: flex;
          flex-direction: column;
        }

        p {
          color: #333;
          font-weight: 500;
          letter-spacing: 0.1rem;
        }

        > div > span {
          font-size: 21px;
          font-weight: bold;
          margin: 5px 0 20px;
          color: #39b100;
          margin-bottom: 1rem;
          font-weight: 500;
        }
      }
    }

    button {
      background: #6606aa;
      color: #fff;
      border: 0;
      border-radius: 0px 0px 8px 8px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
