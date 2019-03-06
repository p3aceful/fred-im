import React, { Component } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Collapse,
    Nav
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            name: '',
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        const { getProfile } = this.props.auth;
        getProfile((err, profile) => {
            if (err) {
                console.error(err);
            }
            else {
                this.setState({ name: profile.name });
            }
        });
    }

    goTo(route) {
        this.props.history.push(`/${route}`);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <Navbar className="bg-dark flex-shrink-0" expand="md" color="light" dark>
                <NavbarBrand className="mr-auto text-light"><span>{this.state.name}</span></NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {
                            !isAuthenticated() ? (
                                <button className="btn btn-dark mr2" onClick={this.login}>Log in</button>
                            ) : (
                                <button className="btn btn-dark mr2" onClick={this.logout}>Log out</button>
                            )
                        }
                        {
                            isAuthenticated() && 
                            <NavLink to="/profile" className="btn btn-dark">Profile</NavLink>
                        }
                    </Nav>
                </Collapse>
                <NavbarToggler onClick={this.toggle} className="mr-2" />
            </Navbar>
        );
    }
}