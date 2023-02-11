import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { accessToken } = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (accessToken) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{ pathname: "/login" }} />;
                }
            }}
        />
    );
};
export const PublicRoute = ({ component: Component, ...rest }) => {
    const { accessToken, user } = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (accessToken) {
                    if(user) {
                        if(user && user.role === 'admin') {
                            return <Redirect to={{ pathname: "/admin" }} />;
                        } else if((user && user.role === 'normal')) {
                            return <Redirect to={{ pathname: "/app" }} />;
                        }
                    } else {
                        let userLocal = JSON.parse(localStorage.getItem("user")).user;
                        if(userLocal && userLocal.role === 'admin') {
                            return <Redirect to={{ pathname: "/admin" }} />;
                        } else if((userLocal && userLocal.role === 'normal')) {
                            return <Redirect to={{ pathname: "/app" }} />;
                        }
                    }
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};
