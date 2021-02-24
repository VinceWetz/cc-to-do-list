import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import img from './logo512.png';
import './index.css';
import TODOList from './App';
import AppAPI from './api/AppAPI'


class ErrorPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
    }

    handleRestart = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
    }
//
    render() {
        return (
            <div>
                <h1>Oops... this list does not exist!</h1>
                {this.renderRedirect()}
                <button type="button" className="btn" onClick={this.handleRestart}>Return to home</button>
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
                <img src={img} />
                <h1>Welcome to PinDOin!</h1>
                {this.renderRedirect()}
                <button type="button" className="btn" onClick={this.handleCreate}>Create a new PinDOin list!</button>
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
                    <Route path="/list/:listId" render={(props) => <ListRoute listId={props.match.params.listId}/>} />
                    <Route path="/" children={<WelcomePage />} />

                </Switch>
        </Router>
        )}

ReactDOM.render(<App />, document.getElementById("root"));