import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "Let search !!!",
        }
    }
    handleChangle = (event) => {
        this.setState({ keyword: event.target.value });
    }

    render() {
        return (
            <div className="w-75 mb-2" style={{ display: "flex", margin: "auto" }}>
                <input
                    className="w-75 form-control"
                    value={this.state.keyword}
                    onChange={this.handleChangle}
                />
                {this.state.keyword.length > 0 ? <button className="w-25 btn btn-primary">Search</button> : null}
                {/* {this.state.keyword.length > 0 && <button className="btn btn-primary">Search</button>} */}
            </div>
        )
    }
}

export default SearchForm