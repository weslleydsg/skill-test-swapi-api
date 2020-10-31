import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';

import { Container, Logo, Content, SessionButton } from './styles';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { signed, signOut } = useAuth();
  const { themeName, toggleTheme } = useTheme();

  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <Logo src={logoImg} />
          </Link>
          <Link to="/characters" />
        </nav>
        {signed ? (
          <aside>
            <SessionButton>
              <Link to="/" onClick={signOut}>
                Sign Out
              </Link>
            </SessionButton>
          </aside>
        ) : (
          <aside>
            <SessionButton>
              <Link to="/SignIn">Sign In</Link>
            </SessionButton>
            <SessionButton>
              <Link to="/SignUp">Sign Up</Link>
            </SessionButton>
            <SessionButton>
              <span>Dark Mode</span>
              <Switch
                onChange={toggleTheme}
                checked={themeName === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={24}
                width={40}
                height={18}
                offColor={lighten(0.1, colors.highlight)}
                onColor={colors.tertiary}
              />
            </SessionButton>
          </aside>
        )}
      </Content>
    </Container>
  );
};

export default Header;
