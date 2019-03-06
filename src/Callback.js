import React, { Component } from 'react';
import doge from './doge.png';

class Callback extends Component {
    
    render() {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img className="rounded-circle" src={doge} alt="loading"></img>

                <h2>{this.props.loadingMessage}</h2>
            </div>
        )
    }
}

export default Callback;