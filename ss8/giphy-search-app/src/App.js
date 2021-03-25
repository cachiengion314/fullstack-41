import './App.css';
import "./custom-style.css";
import Header from "./project-components/header"
import SearchForm from './project-components/search-form';
import ImgCards from './project-components/img-card/ImgCards';
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Let search !!!"
    }
    console.log(`constructor`)
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
        <SearchForm />
        <ImgCards />
      </div>
    )
  }
}

export default App;