import React, { Component } from 'react';
import { groupBy } from './util.js';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import Message from './components/Message.js';
import './Chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.delayBetweenTypingStates = 10000;

        this.handleChange = this.handleChange.bind(this);
        this.sendChatMessage = this.sendChatMessage.bind(this);
        this.notifyStartTyping = this.notifyStartTyping.bind(this);
        this.notifyStoppedTyping = this.notifyStoppedTyping.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.typingTimeoutID);
    }

    sendChatMessage(e) {
        e.preventDefault();

        this.notifyStoppedTyping();
        this.props.send({
            type: 'chat',
            message: this.state.value,
        });
        this.setState({ value: '' });
    }

    handleChange(event) {
        this.notifyStartTyping();
        this.setState({ value: event.target.value });
    }

    notifyStartTyping() {
        if (this.state.value === '') {
            return;
        }
        clearTimeout(this.typingTimeoutID);
        if (this.timerIsRunning) {
            this.typingTimeoutID = setTimeout(this.notifyStoppedTyping, this.delayBetweenTypingStates);
        }
        else {
            this.props.send({ type: 'started_typing' });
            this.timerIsRunning = true;
            this.typingTimeoutID = setTimeout(this.notifyStoppedTyping, this.delayBetweenTypingStates);
        }
    }

    notifyStoppedTyping() {
        this.props.send({ type: 'stopped_typing' });
        this.timerIsRunning = false;
        clearTimeout(this.typingTimeoutID);
    }

    render() {

        return (
            <Container fluid={true} style={{ minHeight: '0' }} className="d-flex flex-column flex-grow-1">
                <Row className="flex-grow-1" style={{ overflow: 'auto' }}>
                    <Col className="flex-grow-1">

                        <MessageContainer messages={this.props.messages} />

                    </Col>
                </Row>
                <Row className="flex-shrink-0">
                    <Col className="" style={{ height: '2em' }}>
                        <Typers typers={this.props.typers} />
                    </Col>
                </Row>
                <Row className="flex-shrink-0">
                    <Col className="">
                        <Form onSubmit={this.sendChatMessage}>
                            <FormGroup>
                                <Input
                                    className=""
                                    type="text"
                                    name="text"
                                    id="message-input"
                                    placeholder="Message..."
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                    autoComplete="off"
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
class MessageContainer extends Component {

    constructor(props) {
        super(props);

        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView();
    }

    render() {
        const groupedMessages = groupBy(this.props.messages, 'userid');

        let messages = groupedMessages.map((msgs, i) => <Message msgs={msgs} key={'msg-group-' + i} />);

        messages = messages.map((m, i) => [m, <hr key={'hr' + i}></hr>]).flat();
        messages = messages.slice(0, -1);

        return (
            <ul className="list-unstyled">
                {messages}
                <li
                    ref={(el) => { this.messagesEnd = el }}
                >
                </li>
            </ul>
        );
    }
}

function Typers(props) {
    if (!props.typers.length) {
        return null;
    }
    else if (props.typers.length === 1) {
        return <span>{props.typers[0]} is typing a message...</span>
    }
    else if (props.typers.length === 2) {
        return <span>{props.typers[0]} and {props.typers[1]} are typing a message...</span>
    }
    else {
        return <span>{props.typers[0]}, {props.typers[1]} and {props.typers.length - 2} other users are typing...</span>
    }
}

export default Chat;