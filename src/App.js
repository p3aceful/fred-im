import React, { Component } from 'react';
import './App.css';
import Chat from './Chat.js';
import Header from './components/Header.js';
import Connection from './Connection.js';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { messages: [], users: [], typers: [], isOpen: false };
		this.connection = null;

		this.send = this.send.bind(this);
		this.toggleOpenState = this.toggleOpenState.bind(this);
	}

	componentDidMount() {
		const url = this.getServerUrl();
		this.connection = new Connection(url);

		this.connection.events.listen('open', () => {
			console.log('Connection established!');
			this.toggleOpenState();
		});

		this.connection.events.listen('chat', data => {
			const { userid, message, date } = data;
			this.setState(prev => ({
				messages: [...prev.messages, { userid, message, date }]
			}));
		});

		this.connection.events.listen('chat_history', data => {
			console.log('Received a chat log of', data.messages.length, 'messages.');
			const messages = data.messages;
			this.setState({ messages });
		});

		this.connection.events.listen('server_broadcast', data => {
			const me = data.peers.you;
			const others = data.peers.clients;
			const set = new Set([me, ...others.map(o => o.id)]);
			this.setState({ users: [...set] });
		});

		this.connection.events.listen('user_started_typing', data => {
			console.log('A user started typing');
			const userid = data.userid;
			this.setState(prev => ({
				typers: [...prev.typers, userid]
			}));
		});

		this.connection.events.listen('user_stopped_typing', data => {
			console.log('A user stopped typing');

			const userid = data.userid;
			this.setState(prev => ({
				typers: prev.typers.filter(typerid => typerid !== userid)
			}));
		});
	}

	getServerUrl() {
		if (window.location.hostname === 'localhost') {
			return 'ws://localhost:9876';
		}
		else {
			return 'wss://fred-im.herokuapp.com';
		}
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
		this.connection.send(data);
	}

	toggleOpenState() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}
}

export default App;
