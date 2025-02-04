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
            <div className="centered">
                <h2>Oops... this list doesn't exist (anymore)!</h2>
                <p> </p>
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
            list: NaN,
            listId: '',
            redirect: true
        };
    }

    handleCreate = async (e) => {
        const list = await AppAPI.getAPI().createList()
        this.setState({
            list: list
        })
    }

    handleChange = (e) => {
        this.setState({
            listId: e.target.value,
        })
    }

    handleJoin = async (e) => {
        if (this.state.listId) {
            // Prüfen, ob Liste mit ID existiert und in State speichern
            e.preventDefault();
            const list = await AppAPI.getAPI().getList(this.state.listId)
            if (list.length >= 1) {
                this.setState({success: true, list: list[0]})
            } else {
                this.setState({success: false, list: NaN})
            }
        }
        this.setState({
            listId: "",
        })
    }
    
    renderRedirect = () => {
        if (this.state.list) {
            return <Redirect to={'/list/' + this.state.list.getListId()} />
        }
    }

    render() {
        return (
            <div className="centered">
                <img src={img} />
                <h1>Welcome to PinDOin!</h1>
                <p>You can create a new list or join an existing one</p>
                {this.renderRedirect()}
                <button type="button" className="btn" onClick={this.handleCreate}>Create a new list</button>
                <p>OR</p>

                <div>
                    <form onSubmit={this.handleJoin}>           
                        <input type="text" className= "btn" placeholder="Enter List ID here" value={this.state.listId} onChange={this.handleChange} /> 
                        <input type="submit" className= "btn" value="Join" />
                    </form>     
                </div>
                
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