import './App.css';
import React, { Component } from 'react';
import Form from "./project-components/form";
import Tasks from "./project-components/tasks";
import Utility from './Utility';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteSingleTask = this.handleDeleteSingleTask.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleInputFormChangle = this.handleInputFormChangle.bind(this);
    this.state = {
      tasks: [
        {
          _id: "12345",
          content: "Learn react",
          isDone: false,
        }
      ],
      formInputVal: ""
    }
  }
  handleInputFormChangle(e) {
    this.setState({ formInputVal: e.target.value });
  }
  handleChecked(e) {
    const _id = e.target.parentNode.id;
    let foundIndex = this.state.tasks.findIndex(elt => elt._id === _id);
    let tasksClone = this.state.tasks.slice();
    tasksClone[foundIndex].isDone = e.target.checked;
    this.setState({ tasks: tasksClone });
  }
  handleDeleteSingleTask(_id) {
    let foundIndex = this.state.tasks.findIndex(elt => elt._id === _id);
    let tasksClone = this.state.tasks.slice();
    tasksClone.splice(foundIndex, 1);
    this.setState({ tasks: tasksClone });
  }
  handleSubmit(e) {
    e.preventDefault();
    let iteratorData = new FormData(e.target).entries();
    let task = {};
    for (let [key, val] of iteratorData) {
      task[key] = val;
    }
    task._id = Utility.getRandomHash();
    this.setState({ tasks: [...this.state.tasks, task], formInputVal: "" });
  }
  render() {
    return (
      <div className="App p-5" >
        <Form formInputVal={this.state.formInputVal} handleInputFormChangle={this.handleInputFormChangle} handleSubmit={this.handleSubmit} className="w-100" />
        <Tasks handleChecked={this.handleChecked} handleDeleteSingleTask={this.handleDeleteSingleTask} tasks={this.state.tasks} className="w-100" />
      </div>
    );
  }
}

export default App;