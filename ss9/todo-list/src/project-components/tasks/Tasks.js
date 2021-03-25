import React, { Component } from 'react';
import Task from "./Task";

class Tasks extends Component {
    countTaskInProgress(tasks) {
        return tasks.reduce((preVal, elt) => {
            // eslint-disable-next-line
            preVal += !elt.isDone && 1 || 0;
            return preVal;
        }, 0);
    }
    render() {
        return (
            <div className={this.props.className}>
                {
                    // eslint-disable-next-line
                    this.countTaskInProgress(this.props.tasks) &&
                    <h5>{`There are ${this.countTaskInProgress(this.props.tasks)} task to complete`}</h5>
                    // eslint-disable-next-line
                    ||
                    <h5>{`All tasks are done`}</h5>
                }
                {
                    this.props.tasks.map((elt) => {
                        return (
                            <Task
                                id={elt._id} key={elt._id}
                                isDone={elt.isDone} handleChecked={this.props.handleChecked}
                                handleDeleteSingleTask={this.props.handleDeleteSingleTask.bind(elt._id)}
                                content={elt.content}
                                className="100% mb-2"
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default Tasks;