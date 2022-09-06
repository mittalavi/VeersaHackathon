
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    function isLogin(){
        if(JSON.parse(localStorage.getItem("user"))){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;