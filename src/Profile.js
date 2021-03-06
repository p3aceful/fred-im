import React, { Component } from 'react';

class Profile extends Component {
    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        }
        else {
            this.setState({ profile: userProfile });
        }
    }

    render() {
        console.log(this.props.auth);
        const { profile } = this.state;
        return (
            <div className="container">
                <div>
                    <h1>{profile.name}</h1>
                    <img src={profile.picture} alt="profile" />
                    <h3>{profile.nickname}</h3>
                </div>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
        );
    }
}

export default Profile;