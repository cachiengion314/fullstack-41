import './App.css';
import "./custom-style.css";
import Header from "./project-components/header"
import SearchForm from './project-components/search-form';
import ImgCards from './project-components/img-card/ImgCards';
import React, { Component } from "react";
import Loading from './project-components/header/loading/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Let search !!!",
      images: [],
      isLoading: false,
    }
    // console.log(`constructor`)
  }
  changleLoadingStatus = () => {
    if (this.state.isLoading) {
      this.setState({ isLoading: false })
    } else {
      this.setState({ isLoading: true })
    }
  }

  changleImages = (images, offset) => {
    if (offset === 0) {
      this.setState({ images })
    } else {
      this.setState(pre => {
        return {
          isLoading: false,
          images: [...pre.images, ...images]
        }
      })
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ content: "tim kiem" })
    }, 3000);
    console.log(`componentDidMount`)
  }

  componentDidUpdate() {
    console.log(`componentDidUpdate`)
  }

  componentWillUnmount() {
    console.log(`componentWillUnmount`)
  }

  render() {
    console.log(`render`)
    return (
      <div className="w-100 App " >
        <Header content={this.state.content} />
        <SearchForm changleLoadingStatus={this.changleLoadingStatus} changleImages={this.changleImages} />
        <Loading isLoading={this.state.isLoading} />
        <ImgCards images={this.state.images} />
      </div>
    )
  }
}

export default App;