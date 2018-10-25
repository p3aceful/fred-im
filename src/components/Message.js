import React, { Component } from 'react';
import { formatDate } from '../util.js';
import { Media } from 'reactstrap';
import logo from '../doge.png';

export default class Message extends Component {

    render() {
        const { userid } = this.props.msgs[0];
        return (
            <Media>
                <Media left top>
                    <Media object className="avatar mr-2 rounded-circle" src={logo} alt="avatar" />
                </Media>
                <Media body className="wrap d-flex flex-column">
                    <Media heading>
                        {userid}
                    </Media>
                    {
                        this.props.msgs.map((msg, i) => {
                            return (<div key={msg.date}>{msg.message}</div>);
                        })
                    }
                    <div className="align-self-end text-muted">{formatDate(this.props.msgs[this.props.msgs.length - 1].date)}</div>
                </Media>
            </Media>
        );
    }
}