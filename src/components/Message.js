import React, { Component } from 'react';
import { formatDate } from '../util.js';
import logo from '../doge.png';

export default class Message extends Component {

    render() {
        const { userid } = this.props.msgs[0];
        return (
            <li className="media ow-wrap-break-word" >
                <img className="mr-3 avatar rounded-circle" src={logo} alt="Avatar" />
                <div className="media-body" style={{minWidth: '0'}}>
                    <h5 className="mt-0">{userid}</h5>
                    <ul className="list-unstyled d-flex flex-column">
                        {
                            this.props.msgs.map((msg, i) => {
                                return <li key={`${i}sub${msg.date}`}>{msg.message}</li>;
                            })
                        }
                        <li className="mt-2 font-weight-light text-muted align-self-end">{formatDate(this.props.msgs[this.props.msgs.length - 1].date)}</li>
                    </ul>
                </div>
            </li>
        );
    }
}