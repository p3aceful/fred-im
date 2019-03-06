import React from 'react';
import './Loader.css';

export default function Spinner({ message }) {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column flex-grow-1">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <p>{message}</p>
        </div>
    );
} 