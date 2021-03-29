import React, { Component } from 'react';
import ImgCard from './ImgCard';

class ImgCards extends Component {
    render() {
        return (
            <div className="all w-100 align-center">
                {
                    this.props.images.map((img, index) => {
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