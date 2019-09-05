import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={
            props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin', // redirect to
                state: { from: props.location }, // current location the user tried to access
              }} />
            )

          }
        />
      )}
    </Consumer>
  );
};
