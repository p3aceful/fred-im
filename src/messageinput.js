import React, { Component } from 'react';
import {
    Form,
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap';

export default class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmitCallback(this.state.value);
        this.setState({ value: '' });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.onChangeCallback();
    }

    render() {
        return (
            <Form className="mb-3 pl-3 pr-3 mh-100" onSubmit={this.handleSubmit}>
                <InputGroup>
                    <Input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Message..." />
                    <InputGroupAddon addonType="append">
                        <Button color="dark">Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }
}