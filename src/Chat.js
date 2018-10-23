import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import { groupBy, deepClone, formatDate } from './util.js';
import './Chat.css';
import logo from './doge.png';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', messages: [], users: [], typers: [] };
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
        this.pingTimeoutId = setTimeout(this.send, 30000, { type: 'ping' });
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
        clearInterval(this.typingTimeoutId);
        clearInterval(this.pingTimeoutId);
        this.connectionManager.send({ type: 'stopped_typing' });
        this.connectionManager.send(data);
        this.pingTimeoutId = setTimeout(this.send, 30000, { type: 'ping' });
    }

    addCurrentTyper(userid) {
        if (this.state.typers.filter(t => t === userid).length === 0) {
            const users = [...this.state.typers, userid];
            this.setState({ typers: users });
        }
    }

    removeCurrentTyper(userid) {
        const users = this.state.typers.filter(u => u !== userid);
        this.setState({ typers: users });
    }
    
    handleChange(event) {

        if (event.target.value.length > this.state.value.length) {
            this.send({
                type: 'started_typing',
            });
            this.typingTimeoutId = setTimeout(this.send, 10000, { type: 'stopped_typing' });
        }

        if (event.target.value === '') {
            clearInterval(this.typingTimeoutId);
            this.send( { type: 'stopped_typing'});
        }
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

        messages = messages.map((m, i) => [m, <hr className="no-margin" key={'hr' + i}></hr>]).flat();
        messages = messages.slice(0, -1);
        const activeUsers = [...this.state.users]
            .map(user => <UserlistElement user={user} key={user} />);

        return (
            <div className="container-fluid h-100">
                <div className="row h-100 no-gutters">

                    <div className="col-9 d-flex flex-column left-col">
                        <ul className="messages-container list-unstyled" ref={div => this.messageList = div}>
                            <div>
                                {messages}
                            </div>
                        </ul>
                        
                        <Typers typers={this.state.typers} />
                        <form className="mr-3" onSubmit={this.sendChatMessage}>
                            <div className="form-group row">
                                <div className="col">
                                    <input className="form-control" id="message-input" placeholder="Message..." type="text" onChange={this.handleChange} value={this.state.value} />
                                </div>
                            </div>
                        </form>
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
            <li className="media message" key={date}>
                <img src={logo} className="align-self-end imagedoge mr-3 mb-4" alt="avatar.png"></img>
                <div className="media-body d-flex flex-column">
                    <h5>{userid}</h5>
                    {this.props.msgs.map((msg, i) => {
                        return (
                            <div className="wrap" key={`${userid}-${i}`}>
                                {msg.message}
                            </div>
                        );
                    })}
                    <div className="align-self-end mr-3">{formatDate(this.props.msgs[this.props.msgs.length - 1].date)}</div>
                </div>
            </li>
        );
    }
}

function Typers(props) {
    const typers = [...props.typers];
    if (typers.length === 0) {
        return <p></p>;
    }
    const end = typers.length > 1 ? ' are ' : ' is ';

    return <p>{typers.join(', ') + end + 'typing.'}</p>;
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