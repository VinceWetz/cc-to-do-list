import BusinessObject from './BusinessObjects';
import List from './List';

export default class TODO extends BusinessObject{
    constructor(category, task){
        super(category)
        this.todoId = 0;
        this.task = task;
        this.checked = false;
        this.createTimestamp = new Date().toISOString();
        this.checkTimestamp = new Date().toISOString();
    }

    setTodoId(todoId){
        this.todoId = todoId
    }

    setTask(task){
        this.task = task
    }
    
    setChecked(checked){
        this.checked = checked
    }    
    
    setCreateTimestamp(createTimestamp){
        this.createTimestamp = createTimestamp
    }

    setCheckedTimestamp(checkTimestamp){
        this.checkTimestamp = checkTimestamp
    }

    getTodoId(){
        return this.todoId
    }

    getTask(){
        return this.task
    }

    getChecked(){
        return this.checked
    }

    getCreateTimestamp(){
        return this.createTimestamp
    }

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