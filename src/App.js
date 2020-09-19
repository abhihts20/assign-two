import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,withRouter,Switch} from 'react-router-dom';
import Create from './Users/Create';
import View from './Users/View';
import Navbar from './Users/Navbar'
import EditUser from './Users/EditUser'

function App() {
    return (
        <div className="App">
            <Router>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Create}/>
                        <Route exact path="/users/create" component={Create}/>
                        <Route path="/edit-user/:id" component={EditUser} />
                        <Route exact path="/users/view" component={View}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
