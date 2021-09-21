import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --body: #5519cc;
    --body-base: #ff00A8;
    --background: #f0f8f9;

    --white: #FFFFFF;
    --black: #000000;
    --text-title: #363f4f;
  }

  html {
    @media(max-width: 1080px){
      font-size: 93.75%;
    }

    @media(max-width: 720px){
      font-size: 87.5%;
    }
  }

  body {
    background: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content-login {
        width: 100%;
        max-width: 400px;
        background: #fafafa;
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
        max-height: 500px;
        height: 100%;
    }

    .react-modal-close{
        position: absolute;
        right:1.5rem;
        top:1.5rem;
        border: 0;
        background: transparent;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }
    }

    .react-modal-content {
        max-width: 550px;
        width: 100%;
        background: #fafafa;
        padding: 3rem 1.5rem;
        position: relative;
        border-radius: 0.25rem;
        max-height: 500px;
        overflow-x: auto;
        ::-webkit-scrollbar {
          width: 0px;
        }
    }
`;
