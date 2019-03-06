import React, { Component } from 'react';
import { formatDate } from './util.js';

export default class Message extends Component {

    render() {
        const { name, picture } = this.props.msgs[0];
        return (
            <li className="d-flex flex-column">
                <div className="media">
                    <img style={{ width: '64px', height: '64px' }} className="mr-3 rounded-circle align-self-end" src={picture} alt="Avatar" />
                    <div className="media-body" style={{minWidth: '0'}}>
                        <h5 className="mt-0">{name}</h5>
                        <ul style={{ overflowWrap: 'break-word'}} className="list-unstyled d-flex flex-column">
                            {
                                this.props.msgs.map((msg, i) => {
                                    return <li key={`${i}sub${msg.date}`}>{msg.message}</li>;
                                })
                            }
                        </ul>
                    </div>
                </div>
                <p className="mt-2 font-weight-light text-muted align-self-end">{formatDate(this.props.msgs[this.props.msgs.length - 1].date)}</p>
            </li>
        );
    }
}