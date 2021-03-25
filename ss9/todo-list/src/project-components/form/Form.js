import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form className={this.props.className + " row g-3"} onSubmit={this.props.handleSubmit}>
                <div className="col-md-11">
                    <input onChange={this.props.handleInputFormChangle} value={this.props.formInputVal}
                        name="content" onKeyDown={this.handleKeyPress} type="text" placeholder="text here" className="form-control" />
                </div>
                <div className="col-md-1">
                    <button 
                        type="submit" onClick={this.handleClick} className="btn btn-outline-primary mb-3">Add</button>
                </div>
            </form>
        );
    }
}

export default Form;