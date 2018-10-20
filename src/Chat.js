import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager.js';
import { Col, Form, FormGroup, Input } from 'reactstrap';
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

    addMessage(user, message) {
        const messages = JSON.parse(JSON.stringify(this.state.messages));

        const last = messages.pop();

        console.log(last)
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
        const messages = this.state.messages.map((msg, index) => {
            const linebreak = index === this.state.messages.length - 1 || <hr></hr>;
            return (
                <div key={index}>
                    <Media message={msg.message} user={msg.user}  mt="mt-0"/>
                    {linebreak}
                </div>
            );
        });
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
                            <div className="col messages-container" ref={div => {
                                this.messageList = div;
                            }}>
                                <div className="messages">
                                    {messages}
                                </div>
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

function Media(props) {
    return (
        <div className="media" >
            <img className="imagedoge" src={logo} alt="Doge"></img>
            <div className="media-body">
                <h5 className={props.mt}>{props.user}</h5>
                {props.message.map((msg, index) => (<p key={index} className="mg-0">{msg}</p>))}
            </div>
        </div>
    );
}

export default Chat;