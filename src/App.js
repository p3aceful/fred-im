import React, { Component } from 'react';
import './App.css';
import Chat from './Chat.js';
import Header from './components/Header.js';
import ConnectionManager from './ConnectionManager.js';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { messages: [], users: [], typers: [], isOpen: false };
		this.connectionManager = null;

		this.send = this.send.bind(this);
	}

	addToTypers(userid) {
		this.setState(prev => ({
			typers: [...prev.typers, userid]
		}));
	}

	componentDidMount() {
		const url = this.getServerUrl();
        this.connectionManager = new ConnectionManager(this);
		// this.connectionManager.connect(url);
		setTimeout(this.connectionManager.connect, 1000, url); // Fake delay
        // this.pingTimeoutId = setTimeout(this.send, 30000, { type: 'ping' });
	}

	removeFromTypers(userid) {
		this.setState(prev => ({
			typers: prev.typers.filter(typerid => typerid !== userid)
		}));
	}

	getServerUrl() {
        if (window.location.hostname === 'localhost') {
            return 'ws://localhost:9876';
        }
        else {
            return 'wss://fred-im.herokuapp.com';
        }
	}

	receiveChatHistory(messages) {
		this.setState({ messages });
	}

	receiveMessage(userid, msg, date) {
		this.setState(prev => ({
			messages: [...prev.messages, { userid, message: msg, date }]
		}));
	}

	receiveActiveUsers(users) {
		const set = new Set(users);
		this.setState({ users: [...set] });
	}

	render() {
		return (
			<div className="App d-flex flex-column" style={{ height: '100vh' }}>
				<Header users={this.state.users} />
				<Chat 
					users={this.state.users}
					typers={this.state.typers}
					messages={this.state.messages}
					send={this.send}
					isOpen={this.state.isOpen}
				/>
			</div>
		);
	}

	send(data) {
		clearTimeout(this.pingTimeoutId);
		this.pingTimeoutId = setTimeout(this.send, 30000, { type: 'ping' });
		this.connectionManager.send(data);
	}

	toggleOpenState() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}
}

export default App;
