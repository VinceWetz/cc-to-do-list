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
        console.log(TODOs)

        var TODOElements = TODOs.map((todo) => 
            <Todo
            id={todo.getTodoId()}
            name={todo.getTask()}
            completed={todo.getChecked()}
            key={todo.getTodoId()}
            toggleTaskCompleted={todo.getChecked()}
            deleteTodo={this.deleteTODO}
            editTask={this.updateTODO}
            />
        )
        console.log(TODOElements)
        this.setState({
            todos: TODOElements
        })
    }
    
    addTask(name) {
        console.log(name)
      }

    addTODO = async (task) => {
        const newTODO = new TODO("business", task)
        const createdTODO = await AppAPI.getAPI().createTODO(this.state.list, newTODO)
        this.loadTODOs()

        console.log(createdTODO)
        return createdTODO
    }

    deleteTODO = (todoId) => {
        await AppAPI.getAPI().deleteTODO(this.state.list.getListId(), todoId)
        this.loadTODOs()
        }

    updateTODO = (todo) => {
        AppAPI.getAPI().updateTODO(this.state.list, todo).then(() => {
            // this.props
            })
        }
    

render(){
    
    return (
        <div className="todoapp stack-large">
          <Form addTODO={this.addTODO} />
          <div className="filters btn-group stack-exception">
          </div>
          <h2 id="list-heading">TEST123</h2>
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

// addTodo = (list, todo) => {
//     AppAPI.getAPI().createTODO(list, todo).then(() =>{


//     })    
// }

// addList = () => {
//     AppAPI.getAPI().createList().then(() => {

//     })
// }

// deleteTODO = (list, todo) => {
//     AppAPI.getAPI().deleteToDo(list, todo).then(() => {
//         // this.props
//     })
// }

// deleteList = (listId) => {
//     AppAPI.getAPI().deleteList(listId).then(() => {

//     })
// }

//  handleCheck = async (e) => {
//         this.setState({            
//             checked: e.target.checked           
//         })
//         // sort list (checked / unchecked)
//         // 'Timestamp speichern'
//         // update database
//         // var listEntryChecked = this.props.listEntry
//         // listEntryChecked.setChecked(e.target.checked)
//         // await AppAPI.getAPI().updateTODO(listEntryChecked)
//         // this.props.loadListEntries()
//     }
