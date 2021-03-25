import React, { Component } from 'react';

const TEXT_DECO_LINE_THROUGH = "text-decoration-line-through";
class Task extends Component {
    render() {
        return (
            <div id={this.props.id} className={this.props.className + " p-1 align-v-center border"}>
                <input onChange={this.props.handleChecked} className="form-check-input m-0 me-2" type="checkbox" value="" />
                <h6 className={`w-100 m-0 ${this.props.isDone && TEXT_DECO_LINE_THROUGH}`}>{this.props.content}</h6>
                <button onClick={this.props.handleDeleteSingleTask} className="btn btn-outline-danger m-0">Delete</button>
            </div>
        );
    }
}

export default Task;