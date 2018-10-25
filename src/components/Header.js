import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar className="bg-dark" id="my-header" color="light" dark fixed="top">
                <NavbarBrand className="mr-auto text-light">active users</NavbarBrand>
                <NavbarToggler onClick={this.toggle} className="mr-2" />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <hr />
                    <div>
                        {
                            this.props.users.map((u, i) => <p key={'header-user-' + i}>{u}</p>)
                        }
                    </div>
                </Collapse>
            </Navbar>
        );
    }
}