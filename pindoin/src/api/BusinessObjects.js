export default class BusinessObject {

    constructor(category){
        this.createTimestamp = 1613131072144923000;
        this.category = category;
    }

    setCreteTimestamp(createTimestamp){
        this.createTimestamp = createTimestamp
    }

    setCategory(category){
        this.category = category
    }

    getCreateTimestamp(){
        return this.createTimestamp
    }

    getCategory(){
        return this.category
    }

}