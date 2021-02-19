import React from "react";

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      name: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }  

  handleCheck = (e) => {
    this.props.todo.setChecked(!this.props.todo.getChecked())
    this.props.updateTodo(this.props.todo)
  }

  handleEditing = (e) => {
    this.setState({
      editing: true
    })
  }

  handleDelete = (e) => {
       this.props.deleteTodo(this.props.todo.getTodoId())       
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name != ''){
      this.props.todo.setTask(this.state.name)
      this.props.updateTodo(this.props.todo)
    }
    this.setState({editing: false, name: ''});   
  }

  editingTemplate= () => {
    return (
      <form className="stack-small" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={this.props.todo.getTodoId()}>
            New name for {this.props.todo.getTask()}
          </label>
          <input
              id={this.props.todo.getTodoId()}
              className="todo-text"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              />
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => this.setState({
            editing: false
          })}
          >
          Cancel
          <span className="visually-hidden">renaming {this.state.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {this.state.name}</span>
          </button>
        </div>
      </form>
    );}

    viewTemplate = () => {
      return (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={this.props.todo.getTodoId()}
              type="checkbox"
              defaultChecked={this.props.todo.getChecked()}
              onChange ={this.handleCheck}
            />
            <label className="todo-label" htmlFor={this.props.todo.getTodoId()}>
              {this.props.todo.getTask()}
            </label>
          </div>
          <div className="btn-group">
          <button type="button" className="btn" onClick={this.handleEditing}>
              Edit <span className="visually-hidden">{this.props.todo.getTask()}</span>
          </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={this.handleDelete}
            >
              Delete <span className="visually-hidden">{this.props.todo.getTask()}</span>
            </button>
          </div>
      </div>
      );
    }

  render() {
    return(
      <li className="todo">{this.state.editing ? this.editingTemplate() : this.viewTemplate()}</li>
    );
  }
}

export default Todo;