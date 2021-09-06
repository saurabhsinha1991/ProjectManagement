
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLoggedIn from '../hooks/loggedIn';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLoggedIn] = useLoggedIn();
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
