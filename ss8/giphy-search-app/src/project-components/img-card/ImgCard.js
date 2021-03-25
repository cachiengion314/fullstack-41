import React, { Component } from 'react';

class ImgCard extends Component {
   
    render() {
        return (
            <div className="row image-row w-75 content custom-border mb-2 p-2">
                <div className="col-md-5">
                    <img
                        alt="img-here"
                        src={this.props.imageUrl || "https://media3.giphy.com/media/JeFxU9ufM9Wt6acqlJ/giphy.gif?cid=ecf05e4723sru025mup95j51akuww5w7ci6sgapm13o8uawt&rid=giphy.gif"}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-7">
                    <div>{this.props.description || "default description"}</div>
                </div>
            </div>
        )
    }
}

export default ImgCard