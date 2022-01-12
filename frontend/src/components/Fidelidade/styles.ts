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

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    text-align: center;

    & + p {
      margin: 1rem 0;
    }
  }

  form {
    width: 100%;
    text-align: center;
  }

  .switch {
    position: relative;
    display: inline-block;
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    display: block;
    width: 48px;
    height: 24px;
    text-indent: -150%;
    clip: rect(0 0 0 0);
    color: transparent;
    user-select: none;
  }
  .switch-label::before,
  .switch-label::after {
    content: '';
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .switch-label::before {
    width: 100%;
    height: 100%;
    background-color: #dedede;
    border-radius: 9999em;
    -webkit-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
  }
  .switch-label::after {
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
    -webkit-transition: left 0.25s ease;
    transition: left 0.25s ease;
  }
  .switch-input:checked + .switch-label::before {
    background-color: #6606aa;
  }
  .switch-input:checked + .switch-label::after {
    left: 24px;
  }

  .divider {
    margin: 2rem 0;
    border: 1px dashed var(--text-title);
    width: 100%;
  }

  .point {
    font-weight: 500;
  }
`;
