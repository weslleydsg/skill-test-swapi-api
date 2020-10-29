import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PublicLayout from '../templates/layout_public';
import SystemLayout from '../templates/layout_system';

interface RouteParam {
  component: React.FC;
  isPrivate?: boolean;
  [x: string]: any;
}

const RouteWrapper: React.FC<RouteParam> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const signed = true;

  if (!signed && isPrivate) {
    return <Redirect to="/SignIn" />;
  }

  const Layout = signed ? SystemLayout : PublicLayout;

  return (
    <Route
      {...rest}
      render={() => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
