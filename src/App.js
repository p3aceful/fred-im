import React, { Component } from 'react';
import ChannelInterface from './channels';
import Header from './header.js';
import Spinner from './spinner';
import MessageInput from './messageinput';
import MessageContainer from './messagecontainer';
import Connection from './Connection.js';
import { Container, Col, Row } from 'reactstrap';
import Events from './Events';
import axios from 'axios';

function Typers({ typers }) {
	let text = '';
	switch (typers.length) {
		case 0:
			text = ''; break;
		case 1:
			text = `${typers[0]} is typing a message...`; break;
		case 2:
			text = `${typers[0]} and ${typers[1]} is typing a message...`; break;
		default:
			text = `${typers.length} people are typing...`; break;
	}
	return <span className="ml-3 mr-3 mb-2 font-italic">{text}</span>;
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { channel: null };
		this.events = new Events();
		this.send = this.send.bind(this);
	}

	send(method, endpoint, data = null) {
		const { getAccessToken } = this.props.auth;
		const token = getAccessToken();
		const options = {
			method: `${method}`,
			url: `${process.env.REACT_APP_AUTH0_AUDIENCE}${endpoint}`,
			// mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			data,
		}

		console.log(`${method} | ${process.env.REACT_APP_AUTH0_AUDIENCE}${endpoint}`, data);
		return axios(options);
	}

	changeChannel(channel) {
		console.log('Changing channel to', channel);
		this.setState({ channel });
		this.events.emit('channel', channel);
	}

	render() {

		const channel = <MessengerContainer events={this.events} send={this.send} auth={this.props.auth} channel={this.state.channel} />;
		return (
			<div className="d-flex flex-column" style={{ height: '100vh' }}>
				<Header auth={this.props.auth} history={this.props.history} />
				<Container style={{ minHeight: '0' }} className="d-flex flex-column flex-grow-1" fluid={true}>
					<Row style={{ minHeight: '0' }} className="flex-grow-1">
						<Col xs="3" className="mh-100 d-flex flex-column bg-light border-right">
							<ChannelInterface channel={this.state.channel} send={this.send} change={this.changeChannel.bind(this)} />
						</Col>
						<Col className="mh-100 d-flex flex-column flex-grow-1" xs="9" style={{ padding: '0' }}>
							{
								this.state.channel
									? channel
									: <No />
							}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

function No(props) {
	return (
		<div className="d-flex justify-content-center align-items-center flex-column flex-grow-1">
			<h1 className="">Join a channel to start chattolini</h1>
		</div>
	);
}

class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.sendChatMessage = this.sendChatMessage.bind(this);
	}

	componentWillUnmount() {
		clearTimeout(this.typingTimeoutID);
	}

	sendChatMessage(message) {
		this.props.emitStopTyping();

		this.props.send('POST', `/api/message/${this.props.channel}`, { message })
			.then(res => {
				const { status, statusText } = res;
				console.log('Server responded with:', status, statusText);
			});

		this.setState({ value: '' });
	}

	render() {

		let body = this.props.isOpen
			? <MessageContainer messages={this.props.messages} />
			: <Spinner message="Fetching new messages..." />;

		return (
			<div className="d-flex flex-column mh-100 flex-grow-1">
				{body}
				<Typers typers={this.props.typers} />
				<MessageInput onSubmitCallback={this.sendChatMessage} onChangeCallback={this.props.emitStartTyping} />
			</div>
		);
	}
}

class MessengerContainer extends Component {

	constructor(props) {
		super(props);
		this.state = { messages: [], typers: [], isOpen: false };
		this.toggleOpenState = this.toggleOpenState.bind(this);
		this.emitStartTyping = this.emitStartTyping.bind(this);
		this.emitStopTyping = this.emitStopTyping.bind(this);
		this.startListening = this.startListening.bind(this);

		this.props.events.listen('channel', channel => {
			this.changeChannel(channel);
		});
	}

	changeChannel(channel) {
		this.closeConnection();
		this.openConnection(channel)
	}

	openConnection(channel) {
		this.connection = new Connection(`${process.env.REACT_APP_WSS_ADDRESS}/${channel}`);
		this.connection.events.listen('open', () => {
			console.log('WS connection to', channel, 'is open.');
			this.startListening();
		});

		// Fetch messages from this channél
		this.props.send(`GET`, `/api/messages/${channel}`)
			.then(res => {
				const { status, statusText } = res;
				console.log('Server responded with:', status, statusText);
				return res.data;
			})
			.then(messages => {
				let uniqueIds = new Set(messages.map(msg => msg.userid));
				return Promise.all([...uniqueIds].map(id => this.props.send('get', `/api/users/${id}`)))
					.then(responses => responses.map(response => response.data))
					.then(profiles => {
						let dict = new Map();
						profiles.forEach(({ user_id, name, picture }) => {
							dict.set(user_id, { name, picture });
						});
						return messages.map(msg => {
							const { name, picture } = dict.get(msg.userid);
							return { name, picture, ...msg };
						});
					});
			})
			.then(messages => {
				this.setState({ messages });
				this.toggleOpenState();
			});

		const { getProfile } = this.props.auth;

		getProfile((err, profile) => {
			if (err) {
				console.error(err);
			} else {
				this.user = {
					sub: profile.sub,
					name: profile.name,
				}
			}
		});
	}

	closeConnection() {
		if (this.isTyping) {
			this.emitStopTyping();
		}
		clearTimeout(this.typingTimerID);
		this.connection.events.unsubscribe();
		this.connection.close();
		this.toggleOpenState();
	}

	startListening() {
		this.connection.events.listen('ping', () => {
			console.log('I have been pinged');
		});

		this.connection.events.listen('message', msg => {
			this.setState(prev => ({
				messages: [...prev.messages, msg]
			}));
		});

		this.connection.events.listen('user_stopped_typing', data => {
			const userid = data.name;
			this.setState(prev => ({
				typers: prev.typers.filter(typerid => typerid !== userid)
			}));
		});

		this.connection.events.listen('user_started_typing', data => {
			const userid = data.name;
			this.setState(prev => ({
				typers: [...prev.typers, userid]
			}));
		});
	}

	componentWillMount() {
		this.openConnection(this.props.channel);
	}

	componentWillUnmount() {
		this.closeConnection();
	}

	emitStartTyping() {
		if (this.isTyping) {
			clearTimeout(this.typingTimerID);
			this.typingTimerID = setTimeout(this.emitStopTyping, 3000);
		}
		else {
			this.typingTimerID = setTimeout(this.emitStopTyping, 3000);
			this.isTyping = true;
			this.connection.send({ type: 'started_typing', name: this.user.name });
		}
	}

	emitStopTyping() {
		this.connection.send({ type: 'stopped_typing', name: this.user.name });
		this.isTyping = false;
		clearTimeout(this.typingTimerID);
	}

	toggleOpenState() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}

	render() {
		return (
			<Messenger
				channel={this.props.channel}
				typers={this.state.typers}
				messages={this.state.messages}
				send={this.props.send}
				displayName={this.user}
				isOpen={this.state.isOpen}
				emitStartTyping={this.emitStartTyping}
				emitStopTyping={this.emitStopTyping}
			/>
		);
	}
}

export default App;