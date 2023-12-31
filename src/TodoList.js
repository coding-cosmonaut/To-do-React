import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      empty: true,
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.completion = this.completion.bind(this);
  }
  addTodo(input) {
    this.setState((st) => ({
      tasks: [...st.tasks, input],
      empty: false,
    }));
  }
  removeTodo(id) {
    this.setState(() => ({
      tasks: this.state.tasks.filter((item) => {
        return item.id !== id.id;
      }),
    }));
    if (this.state.tasks.length <= 1) {
      this.setState(() => ({
        empty: true,
      }));
    }
  }
  editTodo(id, updatedTask) {
    const updatedTodos = this.state.tasks.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: updatedTask };
      }
      return todo;
    });
    this.setState({ tasks: updatedTodos });
  }
  completion(status) {
    const updatedTodos = this.state.tasks.map((todo) => {
      if (todo.id === status.id) {
        return { ...todo, completed: !status.completedProp };
      }
      return todo;
    });
    this.setState(() => ({
      tasks: updatedTodos,
    }));
  }
  render() {
    let todo = this.state.tasks.map((item) => {
      return (
        <Todo
          text={item.text}
          key={item.id}
          id={item.id}
          completedProp={item.completed}
          removeTodo={this.removeTodo}
          editTodo={this.editTodo}
          completion={this.completion}
        />
      );
    });
    return (
      <div className="TodoList">
        <h1>To-do List!</h1>
        <div
          className={this.state.empty ? "TodoList-wrapper" : "TodoList-list"}
        >
          {this.state.empty ? "Your to-do list is empty." : todo}
        </div>
        <NewTodoForm addTodo={this.addTodo} editTodo={this.editTodo} />
      </div>
    );
  }
}

export default TodoList;
