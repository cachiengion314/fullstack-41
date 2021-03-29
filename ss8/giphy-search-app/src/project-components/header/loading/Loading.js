import React, { Component } from 'react';
import "./Loading.css";

class Loading extends Component {
    render() {
        return (
            this.props.isLoading &&
            <div className="w-100 align-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>


        )
    }
}

export default Loading