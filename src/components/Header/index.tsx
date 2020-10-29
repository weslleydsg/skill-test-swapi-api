import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Logo, Content, Profile } from './styles';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => (
  <Container>
    <Content>
      <nav>
        <Logo src={logoImg} />
        <Link to="/people">Ver Personagens</Link>
      </nav>
      <aside>
        <Profile>
          <div>
            <Link to="/profile">Meu perfil</Link>
          </div>
        </Profile>
      </aside>
    </Content>
  </Container>
);

export default Header;
