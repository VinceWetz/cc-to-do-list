import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            list: [],
            task: null,
            checked: this.props.listEntry.getChecked()
        };
    }

addTodo = (list, todo) => {
    AppAPI.getAPI().createTODO(list, todo).then(() =>{


    })    
}

addList = () => {
    AppAPI.getAPI().createList().then(() => {

    })
}

deleteTODO = (list, todo) => {
    AppAPI.getAPI().deleteToDo(list, todo).then(() => {
        // this.props
    })
}

deleteList = (listId) => {
    AppAPI.getAPI().deleteList(listId).then(() => {

    })
}

 handleCheck = async (e) => {
        this.setState({            
            checked: e.target.checked           
        })
        // sort list (checked / unchecked)
        // 'Timestamp speichern'
        // update database
        // var listEntryChecked = this.props.listEntry
        // listEntryChecked.setChecked(e.target.checked)
        // await AppAPI.getAPI().updateTODO(listEntryChecked)
        // this.props.loadListEntries()
    }

render(){
    return(
        <div>
            
        </div>
    );

}

}