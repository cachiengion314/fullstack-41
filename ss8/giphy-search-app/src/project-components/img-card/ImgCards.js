import React, { Component } from 'react';
import ImgCard from './ImgCard';

class ImgCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                {
                    imageUrl: "https://media3.giphy.com/media/JeFxU9ufM9Wt6acqlJ/giphy.gif?cid=ecf05e4723sru025mup95j51akuww5w7ci6sgapm13o8uawt&rid=giphy.gif",
                    description: "This is a testing content that have nothing to do with anything",
                    id: "1"
                },
                {
                    imageUrl: "https://media2.giphy.com/media/xKCruWxRyPIV59Yf9J/100.webp",
                    description: "This is a testing content that have nothing to do with anything",
                    id: "2"
                },
                {
                    imageUrl: "https://media4.giphy.com/media/xiJTRbOTnvJwUVULnO/100.webp",
                    description: "This is a testing content that have nothing to do with anything",
                    id: "3"
                },
            ]
        }
    }

    render() {
        return (
            <div className="all w-100 align-center">
                {
                    this.state.images.map((img, index) => {
                        return (
                            <ImgCard
                                key={index}
                                imageUrl={img.imageUrl}
                                description={img.description}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default ImgCards