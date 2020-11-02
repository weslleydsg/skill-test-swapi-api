import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

import { useTheme } from './contexts/theme';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

const App: React.FC = () => {
  const { themeName } = useTheme();

  return (
    <Router history={history}>
      <ThemeProvider theme={themeName === 'light' ? light : dark}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
