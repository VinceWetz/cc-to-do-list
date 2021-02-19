import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import AppAPI from "./api/AppAPI.js"
import TODO from "./api/TODO";


class TODOList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            list: this.props.list,
        };
    }

    componentDidMount() {
        if(this.state.list) {
            this.loadTODOs()
        }
    }

    loadTODOs = async () => {
    // get listentries by user ID
        const TODOs = await AppAPI.getAPI().getTODOs(this.state.list.getListId())

        var TODOElements = TODOs.map((todo, index) => 
            <Todo
                key={index}
                todo={todo}
                deleteTodo={this.deleteTODO}
                updateTodo={this.updateTODO}
            />
        )
        this.setState({
            todos: TODOElements
        })
    }

    addTODO = async (task) => {
        const newTODO = new TODO("business", task)
        const createdTODO = await AppAPI.getAPI().createTODO(this.state.list, newTODO)
        this.loadTODOs()

        return createdTODO
    }

    deleteTODO = async (todoId) => {
        await AppAPI.getAPI().deleteTODO(this.state.list.getListId(), todoId)
        this.loadTODOs()
        }

    updateTODO = async (todo) => {
        await AppAPI.getAPI().updateTODO(this.state.list, todo)
        this.loadTODOs()
    }
    

render(){
    return (
        <div className="todoapp stack-large">
            <h2 id="list-heading">{"List: " + this.state.list.getListId()}</h2>  
          <Form addTODO={this.addTODO} />
          <div className="filters btn-group stack-exception">
          </div>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {this.state.todos}
          </ul>
        </div>
      );
    }
}

export default TODOList;
