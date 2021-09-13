
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user } = useContext(UserContext);
    debugger;
    return (
        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
