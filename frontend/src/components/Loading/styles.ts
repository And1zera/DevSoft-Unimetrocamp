import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  align-items: center;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  left: 0;
  top: 0;
  transition: opacity 0.3s linear;
  width: 100%;
  z-index: 9999;
`;
