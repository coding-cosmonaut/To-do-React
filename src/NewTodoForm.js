import React, { Component } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import './NewTodoForm.css';

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let newSt = {...this.state, id: uuidv4(), completed: false}
    this.props.addTodo(newSt);
    this.setState({
      text: "",
    });
  }
  render() {
    return (
      <div className="Form-Container">
        <form className="Form" onSubmit={this.handleSubmit}>
          <label htmlFor="text"></label>
          <input
            className="Input"
            id="text"
            name="text"
            placeholder="New To-do..."
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button className="Plus-button">
            <FontAwesomeIcon className="Plus-Icon" icon={faPlusCircle} />
          </button>
        </form>
      </div>
    );
  }
}

export default NewTodoForm;