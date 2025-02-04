import React, { useState } from "react";
import img from './../logo512.png';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name != "") {
      this.props.addTODO(this.state.name);
    }
    this.setState({name: ""});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <div>
        <img src={img} />
        </div> */}
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={this.state.name}
          onChange={this.handleChange}
          />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
}

export default Form;