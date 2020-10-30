import React from 'react';
import { Router } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router history={history}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    <GlobalStyle />
  </Router>
);

export default App;
