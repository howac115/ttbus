import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Register from './pages/register';
import adminMain from './pages/adminMain.js';
import schoolMain from './pages/schoolMain.js';
import schedule from './pages/schedule.js'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/register" exact component={Register}></Route>
                    <Route path="/school" exact component={schoolMain}></Route>
                    <Route path="/admin" exact component={adminMain}></Route>
                    <Route path="/admin/schedule" exact component={schedule}></Route>
                    <Route path="/school/schedule" exact component={schedule}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;