import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import './Chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', messages: [] };
        this.connectionManager = null;

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.connectionManager = new ConnectionManager(this);
        this.connectionManager.connect('ws://fred-im.herokuapp.com');
        this.timeoutId = setTimeout(this.send, 30000, { type: 'ping' });
    }

    sendMessage(e) {
        
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
        const messages = this.state.messages;
        messages.push(`${user}: ${message}`);
        this.setState({ messages });
    }

    render() {

        const msgs = this.state.messages.map((msg, i) => <li key={i} className="list-group-item">{msg}</li>);

        return (
            <div className="container-fluid f-90">
                <div className="row f-90">
                    <div className="col-9 f-90 messages">
                        <ul className="list-group">
                            {msgs}
                        </ul>
                    </div>
                    <div className="col-3 f-90 users">Active Users</div>
                </div>
                <div className="col f-10">

                    <div className="row">
                        <form onSubmit={this.sendMessage}>
                            <div className="input-group">
                                <input type="text" placeholder="Message..." onChange={this.handleChange} className="form-control" value={this.state.value}/>
                                <div className="input-group-append">
                                    <button className="btn" type="button" id="button-addon2">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }

}

// class Events {
//     constructor() {
//         this._listeners = new Set;
//     }

//     listen(name, callback) {
//         this._listeners.add({
//             name,
//             callback
//         });
//     }

//     emit(name, ...data) {
//         this._listeners.forEach(listener => {
//             if (listener.name === name) {
//                 listener.callback(...data);
//             }
//         });
//     }
// }

export default Chat;