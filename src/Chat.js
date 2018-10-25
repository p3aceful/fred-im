import React, { Component } from 'react';
import { groupBy } from './util.js';
import {
    Container,
    Row,
    Col,
    ListGroupItem,
    ListGroup,
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
        const groupedMessages = groupBy(this.props.messages, 'userid');

        let messages = groupedMessages.map((msgs, i) => <Message msgs={msgs} key={'msg-group-'+ i} />);

        messages = messages.map((m, i) => [m, <hr key={'hr' + i}></hr>]).flat();
        messages = messages.slice(0, -1);
        const activeUsers = this.props.users
            .map((user, i) => <p className="ml-2 font-weight-light" key={'lgitem-'+ i}>- {user}</p>);

        return (
            <Container fluid={true} className="h-100">
                <Row className=" h-100">
                    <Col sm="8" className="col-left mh-100 bg-light">
                        <div className="d-flex flex-column h-100">
                            <div className="d-flex flex-column flex-grow-1 mh-100">
                                <div className="overflow-container mh-100">
                                    <MessageList messages={messages} />
                                </div>
                                <p className="flex-shrink-0">
                                    <Typers typers={this.props.typers}/>
                                </p>
                                <form className="flex-shrink-0" onSubmit={this.sendChatMessage}>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input className="form-control bg-dark text-light" id="message-input" placeholder="Message..." type="text" onChange={this.handleChange} value={this.state.value} />
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </Col>
                    <Col sm="4" className="col-right bg-dark text-light d-none d-sm-block">
                        <p className="mt-3 ml-2">Active yousers</p>
                        {activeUsers}
                    </Col>
                </Row>
            </Container>
        );
    }
}

class MessageList extends Component {

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
        this.messagesEnd.scrollIntoView({ behavior: "smooth"});
    }

    render() {
        return (
            <div className="overflow-content mr-3" ref={div => this.messageList = div}>
                <div>{this.props.messages}</div>
                <div style={{float: "left", clear: "both"}}
                    ref={(el) => {this.messagesEnd = el; }}>
                </div>
            </div>
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