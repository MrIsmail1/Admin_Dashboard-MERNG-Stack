import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext } from 'src/context/Auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Navigate to="/app/dashboard" /> : <Component {...props} />
      }
    />
  );
}
export default AuthRoute;
