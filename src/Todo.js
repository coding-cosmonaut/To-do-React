import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      updatedTask: this.props.text,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
  }
  handleClick() {
    this.props.removeTodo(this.props);
  }
  handleEdit() {
    this.setState((item) => ({
      isEditing: (item.isEditing = !item.isEditing),
    }));
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.editTodo(this.props.id, this.state.updatedTask);
    this.setState({ isEditing: false });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleCompletion(evt) {
    this.props.completion(this.props);
  }
  render() {
    let results;
    if (this.state.isEditing) {
      results = (
        <div className="Todo">
          <form className="Todo-edit-form" onSubmit={this.handleSubmit}>
            <label htmlFor="updatedTask"></label>
            <input
              onChange={this.handleChange}
              value={this.state.updatedTask}
              name="updatedTask"
              id="updatedTask"
              type="text"
            />
            <button>SAVE</button>
          </form>
        </div>
      );
    } else {
      results = (
        <div className="Todo">
          <div
            className={
              this.props.completedProp
                ? "Todo-task Todo-Completion"
                : "Todo-task"
            }
            onClick={this.handleCompletion}
          >
            <div className="Todo-task-parent">
              <div className="Todo-task">{this.props.text}</div>
            </div>
          </div>
          <div className="Todo-buttons">
            <button onClick={this.handleEdit}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button onClick={this.handleClick}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      );
    }
    return results;
  }
}

export default Todo;
