import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Profile from './Profile';
import Login from './login';
import Auth from './Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {

    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <Route
                    exact
                    path="/"
                    render={(props) => <Login auth={auth} {...props} />}
                />

                <Route
                    path="/home"
                    render={(props) => (
                        !auth.isAuthenticated() ? (
                            history.replace('/')
                        ) : (
                            <App auth={auth} {...props} />
                        )
                    )}
                />

                <Route path="/profile" render={(props) => (
                    !auth.isAuthenticated() ? (
                        history.replace('/')
                    ) : (
                        <Profile auth={auth} {...props} />
                    )
                )} />

                <Route path="/callback" render={(props) => {
                    console.log('The props sent to /callback is', props);
                    handleAuthentication(props);
                    return <Callback loadingMessage={'loading...'} {...props} />
                }} />

            </div>
        </Router>
    );
}