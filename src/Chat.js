import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import './Chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', messages: [], users: [] };
        this.connectionManager = null;

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.connectionManager = new ConnectionManager(this);
        // this.connectionManager.connect('wss://fred-im.herokuapp.com');
        this.connectionManager.connect('ws://localhost:9876');
        this.timeoutId = setTimeout(this.send, 30000, { type: 'ping' });
    }

    sendMessage(e) {
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

    appendMessage(user, message) {
        const messages = JSON.parse(JSON.stringify(this.state.messages));

        messages.push(`${user}: ${message}`);
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

        const msgs = this.state.messages.map((msg, i) => <li key={i} className="list-group-item">{msg}</li>);
        const activeUsers = this.state.users.map(user => <li key={user}>{user}</li>)
        return (
            <div className="container-fluid f-90">
                <div className="row f-90">
                    <div 
                        className="col-9 f-90 messages"
                        ref={div => {
                            this.messageList = div;
                        }}
                    >
                        <ul className="list-group">
                            {msgs}
                        </ul>
                    </div>
                    <div className="col-3 f-90 users">Active Users:
                        {activeUsers}
                    </div>
                </div>
                <div className="col f-10">

                    <div className="row">
                        <form onSubmit={this.sendMessage}>
                            <div className="input-group">
                                <input type="text" placeholder="Message..." onChange={this.handleChange} className="form-control" value={this.state.value}/>
                                <div className="input-group-append">
                                    <button className="btn" type="submit" id="button-addon2">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Chat;