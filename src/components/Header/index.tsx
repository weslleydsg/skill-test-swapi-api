import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import { Container, Logo, Content, SessionButton } from './styles';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { signed, signOut } = useAuth();

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
          </aside>
        )}
      </Content>
    </Container>
  );
};

export default Header;
