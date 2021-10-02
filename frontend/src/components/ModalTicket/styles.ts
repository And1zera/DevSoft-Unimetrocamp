import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    text-align: center;
    color: var(--text-title);
    font-weight: 500;
  }
  > div {
    border-radius: 1rem;
    padding: 2rem 3rem;
    background: #7159c1;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }

  p {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--white);

    span {
      font-weight: 400;
    }
  }
`;
