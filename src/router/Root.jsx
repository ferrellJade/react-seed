import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';

import Page from 'lazy!../components/Page';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/page" component={Page}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Router>
        );
    }
}