import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import './index.css';
import TODOList from './App';
import AppAPI from './api/AppAPI'

async function getList(listId) {
    const list = await AppAPI.getAPI().getList(listId)
    if (list instanceof Array) {
        return {success: true, list: list[0]}
    } else {
        return {success: false, list: NaN}
    }
}

class ErrorPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Oops... this list does not exist!</h1>
            </div>
        )
    }
}

class WelcomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: NaN
        };
    }

    handleCreate = async (e) => {
        const list = await AppAPI.getAPI().createList()
        this.setState({
            list: list
        })
    }

    renderRedirect = () => {
        if (this.state.list) {
            return <Redirect to={'/list/' + this.state.list.getListId()} />
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to pinDOin!</h1>
                {this.renderRedirect()}
                <button type="button" className="btn" onClick={this.handleCreate}>Create a new list!</button>
            </div>
        )
    }
}

class ListRoute extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            success: false,
            list: NaN,
        };
    }

    async componentDidMount() {
        // Prüfen, ob Liste mit ID existiert und in State speichern
        const list = await AppAPI.getAPI().getList(this.props.listId)
        if (list.length >= 1) {
            this.setState({success: true, list: list[0]})
        } else {
            this.setState({success: false, list: NaN})
        }
     }
 
     render() {
        return (<div>{this.state.success ?  <TODOList list={this.state.list}/>  : <ErrorPage />}</div>)
     }
}

function App() {
    return (
        <Router>
                <Switch>
                    <Route path="/list/:list_id" render={(props) => <ListRoute listId={props.match.params.list_id}/>} />
                    <Route path="/" children={<WelcomePage />} />

                </Switch>
        </Router>
        )}

ReactDOM.render(<App />, document.getElementById("root"));