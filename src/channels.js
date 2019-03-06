import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class ChannelInterface extends Component {

    state = { channels: [] };

    componentWillMount() {
        this.props.send('get', '/api/channels')
            .then(({ data }) => {
                this.setState({ channels: [...data] });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const channels = this.state.channels.map(chan => {
            // return <button key={chan._id} onClick={() => this.props.change(chan.name)} >{chan.name}</button>;
            return <Channel channel={this.props.channel} key={chan._id} change={this.props.change} name={chan.name}/>;
        });

        return (
            <div style={{minHeight: '0'}} className="flex-grow-1 mh-100 pt-3">
                <h5>channels</h5>
                {channels}
            </div>
        );
    }
}

function Channel(props) {
    const isActive = props.name === props.channel;
    return (
        <Button 
            disabled={isActive} 
            active={isActive} 
            className="d-flex"
            color="dark"
            block
            onClick={() => props.change(props.name)}
        >
            {props.name}
        </Button>
    );
}