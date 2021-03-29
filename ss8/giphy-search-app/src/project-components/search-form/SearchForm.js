import React, { Component } from 'react';
import axios from "axios";
import debounce from "lodash.debounce"

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "Let search !!!",
            offset: 0,
        }
        this.debounce = null;
    }
    /*
        page 1, page of size 25
        0 => 24
        page 2, page of sieze 
        25 => 49 => offset 25
        page 4, size of page 25
        offset = limit * (page - 1)
        limit = size of page
    */
    handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.setState(pre => {
                return {
                    offset: pre.offset + 25
                }
            }, () => {
                this.handleSearchDebounceImage(
                    this.state.keyword,
                    this.state.offset
                )
            })
        }
    }
    componentDidMount() {
        window.addEventListener(`scroll`, this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener(`scroll`, this.handleScroll)
    }
    handleSearchDebounceImage = async (keyword, offset = 0) => {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=4&offset=${offset}&rating=g&lang=vi`
        const res = await axios.get(url);
        this.props.changleLoadingStatus();
        let images = []
        res.data.data.map(elt => {
            images.push({
                imageUrl: elt.images.downsized_medium.url,
                description: elt.title,
                id: elt.id,
            })
        })

        this.props.changleImages(images, offset);
    }
    debounceSearchImage = debounce(this.handleSearchDebounceImage, 500)
    handleChangle = async (event) => {
        this.props.changleLoadingStatus();
        this.setState({ keyword: event.target.value }, async () => {
            const { keyword } = this.state;
            // this callback invoke after the setState completed

            this.debounceSearchImage(keyword)
            // if (this.debounce) {
            //     clearTimeout(this.debounce);
            // }
            // this.debounce = setTimeout(() => {
            //     this.handleSearchDebounceImage(keyword)
            // }, 500);
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.keyword)
        const url = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${this.state.keyword}&limit=25&offset=${0}&rating=g&lang=vi`
        const res = await axios.get(url);
        console.log(res.data.data)
        let images = []
        res.data.data.map(elt => {
            images.push({
                imageUrl: elt.images.downsized_medium.url,
                description: elt.title,
                id: elt.id,
            })
        })
        this.props.changleImages(images);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                className="w-75 mb-2" style={{ display: "flex", margin: "auto" }}>
                <input
                    className="w-75 form-control"
                    value={this.state.keyword}
                    onChange={this.handleChangle}
                />
                {this.state.keyword.length > 0 ? <button className="w-25 btn btn-primary">Search</button> : null}
                {/* {this.state.keyword.length > 0 && <button className="btn btn-primary">Search</button>} */}
            </form>
        )
    }
}

export default SearchForm