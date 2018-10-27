import React, { Component } from 'react';
import { formatDate } from '../util.js';
import { Media } from 'reactstrap';
import logo from '../doge.png';

export default class Message extends Component {

    render() {
        const { userid } = this.props.msgs[0];
        return (
            <li className="media ow-wrap-break-word" >
                <img className="mr-3 avatar rounded-circle" src={logo} alt="Avatar" />
                <div className="media-body" style={{minWidth: '0'}}>
                    <h5 className="mt-0">{userid}</h5>
                    <ul className="list-unstyled">
                        {
                            this.props.msgs.map((msg, i) => {
                                return <li key={`${i}sub${msg.date}`}>{msg.message}</li>;
                            })
                        }
                    </ul>
                </div>
            </li>
            // <Media className="">
            //     <Media left bottom>
            //         <Media object className="avatar mr-2 rounded-circle" src={logo} alt="avatar" />
            //     </Media>
            //     <Media body className="">
            //         <Media heading>
            //             {userid}
            //         </Media>
            //         {
            //             this.props.msgs.map((msg, i) => {
            //                 return (
            //                     <p 
            //                         style={{}} 
            //                         className="" 
            //                         key={msg.date}
            //                     >
            //                         {msg.message}
            //                     </p>
            //                 );
            //             })
            //         }
            //         <div className="align-self-end text-muted">
            //             {formatDate(this.props.msgs[this.props.msgs.length - 1].date)}
            //         </div>
            //     </Media>
            // </Media>
        );
    }
}