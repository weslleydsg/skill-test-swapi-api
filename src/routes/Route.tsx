import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import PublicLayout from '../templates/layout_public';
import SystemLayout from '../templates/layout_system';

interface RouteParams {
  component: React.FC;
  accessType?: 'private' | 'strictPublic';
  [x: string]: any;
}

const RouteWrapper: React.FC<RouteParams> = ({
  component: Component,
  accessType,
  ...rest
}) => {
  const { signed } = useAuth();

  if (!signed && accessType === 'private') return <Redirect to="/SignIn" />;
  if (signed && accessType === 'strictPublic') return <Redirect to="/" />;

  const Layout = signed ? SystemLayout : PublicLayout;

  return (
    <Route {...rest}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};

export default RouteWrapper;
