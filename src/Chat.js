import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import { Col, Form, FormGroup, Input } from 'reactstrap';
import { groupBy, deepClone, formatDate } from './util.js';
import './Chat.css';
import logo from './doge.png';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', messages: [], users: [] };
        this.connectionManager = null;

        this.handleChange = this.handleChange.bind(this);
        this.sendChatMessage = this.sendChatMessage.bind(this);
        this.send = this.send.bind(this);
    }

    getServerUrl() {
        if (window.location.hostname === 'localhost') {
            return 'ws://localhost:9876';
        }
        else {
            return 'wss://fred-im.herokuapp.com';
        }
    }

    componentDidMount() {
        const url = this.getServerUrl();
        this.connectionManager = new ConnectionManager(this);
        this.connectionManager.connect(url);
        this.timeoutId = setTimeout(this.send, 30000, { type: 'ping' });
        console.log('COMPONENT MOUNTED WAHOO');
    }

    sendChatMessage(e) {

        e.preventDefault();
        this.send({
            type: 'chat',
            message: this.state.value,
        });
        this.setState({ value: '' });
    }

    send(data) {

        clearInterval(this.timeoutId);
        this.connectionManager.send(data);
        this.timeoutId = setTimeout(this.send, 30000, { type: 'ping' });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    addHistory(messages) {
        this.setState({ messages });
        this.scrollToBottom();
    }

    addMessage(userid, message, date) {

        let messages = deepClone(this.state.messages);
        messages = [...messages, { userid, message, date }];
        this.setState({ messages });
        this.scrollToBottom();
    }

    updateUserList(users) {
        this.setState({ users });
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {

        const groupedMessages = groupBy(this.state.messages, 'userid');

        let messages = groupedMessages.map((msgs) => <Message msgs={msgs} key={msgs[0].date} />);

        messages = messages.map((m, i) => [m, <hr key={'hr' + i}></hr>]).flat();
        messages = messages.slice(0, -1);
        const activeUsers = [...this.state.users]
            .map(user => <UserlistElement user={user} key={user} />);

        return (
            <div className="container-fluid h-100">
                <div className="row h-100">

                    <div className="col-9 d-flex flex-column">
                        <div className="row flex-fill">
                            <div className="col messages-container mb-3 d-flex flex-column" ref={div => {
                                this.messageList = div;
                            }}>
                                <ul className="list-unstyled messages ">
                                    {messages}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-2 chat-form">
                                <Form onSubmit={this.sendChatMessage}>
                                    <FormGroup row>
                                        <Col>
                                            <Input id="message-input" placeholder="Message..." type="text" onChange={this.handleChange} value={this.state.value}></Input>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className="col userlist">
                        Active users
                        <ul className="list-unstyled">
                            {activeUsers}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

class Message extends Component {

    render() {
        const { userid, date } = this.props.msgs[0];
        return (
            <li className="media" key={date}>
                <img src={logo} className="align-self-end imagedoge mr-3 mb-4" alt="avatar.png"></img>
                <div className="media-body d-flex flex-column">
                    <h5>{userid}</h5>
                    {this.props.msgs.map((msg, i) => {
                        return (
                            <div key={`${userid}-${i}`}>
                                <div> {msg.message} </div> 
                            </div>
                        );
                    })}
                    <div className="align-self-end mr-3">{formatDate(this.props.msgs[this.props.msgs.length - 1].date)}</div>
                </div>
            </li>
        );
    }
}

function UserlistElement(props) {
    return (
        <li key={props.user} className="media">
            <img className="image-small imagedoge mr-1" src={logo} alt="avatar" />
            <div className="media-body">
                <h5 className="mt-2">{props.user}</h5>
            </div>
        </li>
    );
}


export default Chat;