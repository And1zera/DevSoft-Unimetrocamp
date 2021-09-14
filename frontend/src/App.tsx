import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes } from './routes';

import { GlobalStyle } from './styles';

export function App(): JSX.Element {
  return (
    <Router>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={3000} />
    </Router>
  );
}
