import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './hooks/useCart';

import { Routes } from './routes';

import { GlobalStyle } from './styles';

export function App(): JSX.Element {
  return (
    <Router>
      <CartProvider>
        <GlobalStyle />
        <Routes />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </Router>
  );
}
