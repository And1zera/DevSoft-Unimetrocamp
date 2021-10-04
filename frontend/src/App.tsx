import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes } from './routes';
import { CartProvider } from './hooks/useCart';
import { ModalProvider } from './hooks/useModal';
import { Login } from './pages/Login';
import { GlobalStyle } from './styles';
import { AuthenticatorProvider } from './hooks/useAuthenticator';

Modal.setAppElement('#root');

export function App(): JSX.Element {
  return (
    <Router>
      <AuthenticatorProvider>
        <CartProvider>
          <ModalProvider>
            <GlobalStyle />
            <Routes />
            <ToastContainer autoClose={3000} />
            <Login />
          </ModalProvider>
        </CartProvider>
      </AuthenticatorProvider>
    </Router>
  );
}
