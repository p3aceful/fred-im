import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import { Media, Col, Form, FormGroup, Input } from 'reactstrap';
import './Chat.css';
import logo from './doge.png';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', messages: [], users: [] };
        this.connectionManager = null;

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

    addMessage(user, message) {
        const messages = JSON.parse(JSON.stringify(this.state.messages));

        const last = messages.pop();

        if (last === undefined) {
            messages.push({ user, message: [message] });
        }
        else if (last.user !== user) {
            messages.push(last);
            messages.push({ user, message: [message] });
        }
        else { // Last message has same user as this
            last.message.push(message);
            messages.push(last);
        }
        
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

        let messages = this.state.messages.map((msg, index) => {
            const combined = msg.message.join('\n');
            return (
                <li className="media">
                    <img src={logo} className="align-self-end imagedoge mr-3" alt="Avatar"></img>
                    <div className="media-body linebreak">
                        <h5>{msg.user}</h5>
                        {combined}
                    </div>
                </li>
            );
        });
        
        messages = messages.concat(...messages.map((e,i) => [(<hr></hr>), e])).slice(1);

        const activeUsers = this.state.users.map((user, index) => {
            return (
                <div className="media" key={index}>
                    <img className="imagedoge image-small" src={logo} alt="Doge"></img>
                    <div className="media-body">
                        <h5 className="mt-2">{user}</h5>
                    </div>
                </div>
            );
        });
        return (
            <div className="container-fluid h-100">
                <div className="row h-100">

                    <div className="col-9 d-flex flex-column">
                        <div className="row flex-fill">
                            <div className="col messages-container mb-3" ref={div => {
                                this.messageList = div;
                            }}>
                                <ul className="list-unstyled messages">
                                    {messages}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-2 chat-form">
                                <Form onSubmit={this.sendMessage}>
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

// function Media(props) {
//     return (
//         <div className="media" >
//             <img className="imagedoge" src={logo} alt="Doge"></img>
//             <div className="media-body">
//                 <h5 className={props.mt}>{props.user}</h5>
//                 {props.message.map((msg, index) => (<p key={index} className="mg-0">{msg}</p>))}
//             </div>
//         </div>
//     );
// }

export default Chat;