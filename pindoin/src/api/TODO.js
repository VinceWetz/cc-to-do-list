import BusinessObject from './BusinessObjects';
import List from './List';

export default class TODO extends BusinessObject{
    constructor(category, task, listId){
        super(category)
        this.todoId = 0;
        this.listId = listId
        this.task = task;
        this.checked = false;
        // this.createTimestamp = 1613131072144923000 //Math.floor(new Date().getTime())
        this.checkTimestamp = 1613131072144923000//Math.floor(new Date().getTime())
    }

    setTodoId(todoId){
        this.todoId = todoId
    }

    setListId(listId){
        this.listId = listId
    }

    setTask(task){
        this.task = task
    }
    
    setChecked(checked){
        this.checked = checked
    }    
    
    // setCreateTimestamp(createTimestamp){
    //     this.createTimestamp = createTimestamp
    // }

    setCheckedTimestamp(checkTimestamp){
        this.checkTimestamp = checkTimestamp
    }

    getTodoId(){
        return this.todoId
    }

    getListId(){
        return this.listId
    }

    getTask(){
        return this.task
    }

    getChecked(){
        return this.checked
    }

    // getCreateTimestamp(){
    //     return this.createTimestamp
    // }

    getCheckedTimestamp(){
        return this.checkTimestamp
    }

    // Array TODO's
    static fromJSON(todo) {
        let result = [];
        if (Array.isArray(todo)) {
            todo.forEach((c) => {
                Object.setPrototypeOf(c, TODO.prototype)
                result.push(c)
            })
        } else {
            // Einzelnes Objekt
            let c = todo;
            Object.setPrototypeOf(c, TODO.prototype)
            result.push(c)
        }
        return result;
    }
}