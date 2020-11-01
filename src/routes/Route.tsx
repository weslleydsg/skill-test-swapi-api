import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import { Wrapper } from './styles';

import PublicLayout from '../templates/layout_public';
import SystemLayout from '../templates/layout_system';

import Header from '../components/Header';

interface RouteParam {
  component: React.FC;
  accessType?: 'private' | 'strictPublic';
  [x: string]: any;
}

const RouteWrapper: React.FC<RouteParam> = ({
  component: Component,
  accessType,
  ...rest
}) => {
  const { signed } = useAuth();

  if (!signed && accessType === 'private') {
    return <Redirect to="/SignIn" />;
  }
  if (signed && accessType === 'strictPublic') {
    return <Redirect to="/" />;
  }

  const Layout = signed ? SystemLayout : PublicLayout;

  return (
    <Route
      render={() => (
        <Wrapper>
          <Header />
          <Layout>
            <Component {...rest} />
          </Layout>
        </Wrapper>
      )}
    />
  );
};

export default RouteWrapper;
