import React, { Component } from 'react';
import { groupBy } from './util.js';
import Message from './message';
import doge from './doge.png';

export default class MessageContainer extends Component {

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
        this.messagesEnd.scrollIntoView();
    }

    render() {
        const groupedMessages = groupBy(this.props.messages, 'userid');

        let messages = groupedMessages.map((msgs, i) => <Message msgs={msgs} key={'msg-group-' + i} />);

        messages = messages.map((m, i) => [m, <hr key={'hr' + i}></hr>]).flat();
        messages = messages.slice(0, -1);

        return (
            this.props.messages.length
                ? (
                    <ul className="list-unstyled pl-3 pr-3 flex-grow-1" style={{overflowY: 'auto'}}>
                        {messages}
                        <li ref={(el) => { this.messagesEnd = el }}></li>
                    </ul>
                )
                : ( 
                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                        <img className="rounded-circle" src={doge} alt="doge"></img>
                        <p>No messages here... yet</p>
                        <p ref={(el) => { this.messagesEnd = el }}></p>
                    </div >
                )
        );
    }
}