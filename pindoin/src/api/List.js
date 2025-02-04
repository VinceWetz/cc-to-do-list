import BusinessObject from './BusinessObjects';
import TODO from  './TODO';

export default class List extends BusinessObject{

constructor(category){
    super(category)
    this.listId = 0;
    // this.task = task; 
}

setListId(listId){
    this.listId = listId
}

// setCategory(category){
//     this.category = category
// }

// setTaskName(task){
//     this.task = task
// }

// getCategory(){
//     return this.category
// }

getListId(){
    return this.listId
}

// getTaskName(){
//     return this.task
// }

    // Array List
    static fromJSON(list) {
        let result = [];
        if (Array.isArray(list)) {
            list.forEach((c) => {
                Object.setPrototypeOf(c, List.prototype)
                result.push(c)
            })
        } else {
            // single object
            let c = list;
            Object.setPrototypeOf(c, List.prototype)
            result.push(c)
        }
        return result;
    }

}