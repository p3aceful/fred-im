import React from 'react';

export default class Login extends React.Component {

    login = () => {
        this.props.auth.login();
    }

    render() {
        return (
            <div style={{ height: '100vh' }} className="d-flex flex-column align-items-center justify-content-center">

                <h1>Hey!</h1>
                <p>Forget everything you think you knew about having a conversation online.</p>
                <p>You can sign in!</p>
                <p>Try it!</p>
                <button onClick={this.login} className="btn btn-primary">Sign in</button>
                <p>It's so easy, try it now!</p>
                <p> Click sign in above! Go on!</p>
                <p className="font-weight-bold">Try it</p>
            </div>
        );
    }
}