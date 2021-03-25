import React, { Component } from 'react';
import logo from "../../image/giphy.png";
import "./header.css";

class Header extends Component {
    render() {
        return (
            <div className="w-100 align-center header mb-2">
                <img alt="img_here" src={logo} className="logo d-block mb-1" />
                <h2 className="darkcyan">{this.props.content}</h2>
            </div>
        )
    }
}

export default Header;