import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';

import { Wrapper } from './routes/styles'; // TODO
import GlobalStyle from './styles/global';

import { useTheme } from './contexts/theme';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import Header from './components/Header';

const App: React.FC = () => {
  const { themeName } = useTheme();

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={themeName === 'light' ? light : dark}>
          <Wrapper>
            <Header />
            <Routes />
          </Wrapper>
        </ThemeProvider>
      </AuthProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
