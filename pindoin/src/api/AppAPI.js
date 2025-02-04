import List from './List';
import TODO from './TODO';


export default class AppAPI {

    static #api = null;

    #appServerBaseURL = 'http://18.198.252.55:5000';
    //#appServerBaseURL = 'http://localhost:5000';

    // fetch and return list of json objects



    // list related endpoints
    #getList = (listId) => `${this.#appServerBaseURL}/list/${listId}`;
    #createList = () => `${this.#appServerBaseURL}/lists/create`;
    #deleteList = (listId) => `${this.#appServerBaseURL}/list/${listId}/delete`;


    // todo related endpoints
    #getTODOs = (listId) => `${this.#appServerBaseURL}/list/${listId}/todos`;
    #createTODO = (listId) => `${this.#appServerBaseURL}/list/${listId}/todos/create`;
    #updateTODO = (listId, todoId) => `${this.#appServerBaseURL}/list/${listId}/todo/${todoId}/update`;
    #deleteTODO = (listId, todoId) => `${this.#appServerBaseURL}/list/${listId}/todo/${todoId}/delete`;

    // get the API object, create if not exists already
    static getAPI() {
        if (this.#api == null) {
            this.#api = new AppAPI();
        }
        return this.#api;
    }

    // immediately returns list of json objects after fetching
    #fetchAdv = (url, init={}) => fetch(url, init)
        .then(response => {
            if ("method" in init) {
                console.log(init["method"], url)
            } else {
                console.log("GET", url)
            }
            if (!response.ok){
                console.log(`${response.status} ${response.statusText}`);
                throw Error(`${response.status} ${response.statusText}`)
            }
            return response.json().then((responseJSON) => {return responseJSON.result});
        });


    // list related API call methods

    getList(listId) {
        return this.#fetchAdv(this.#getList(listId)).then((responseJSON) => {
            let responseLists = List.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseLists)
            })
        })
    };

    createList() {
        return this.#fetchAdv(this.#createList(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            }
        }).then((responseJSON) => {
            let responseList = List.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseList)
            })
        })
    };

    deleteList(listId) {
        return this.#fetchAdv(this.#deleteList(listId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            }
        }).then((responseJSON) => {
            let responseList = List.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseList)
            })
        })
    };


    // todo related API call methods
    getTODOs(listId) {
        return this.#fetchAdv(this.#getTODOs(listId)).then((responseJSON) => {
            let responseTODOs = TODO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseTODOs)
            })
        })
    };

    createTODO(list, todo) {
        return this.#fetchAdv(this.#createTODO(list.getListId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todo)
        }).then((responseJSON) => {
            let responseTODO = TODO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseTODO)
            })
        })
    };

    updateTODO(list, todo) {
        return this.#fetchAdv(this.#updateTODO(list.getListId(), todo.getTodoId()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todo)
        }).then((responseJSON) => {
            let responseTODO = TODO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseTODO)
            })
        })
    };


    deleteTODO(listId, todoId) {
        return this.#fetchAdv(this.#deleteTODO(listId, todoId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        }).then((responseJSON) => {
            let responseTODO = TODO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseTODO)
            })
        })
    };





}
