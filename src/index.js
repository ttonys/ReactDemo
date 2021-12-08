import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {mainRoutes} from "./routes";
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/admin' render={routeProps => <App {...routeProps}/>}/>
                {mainRoutes.map(route => {
                    return <Route key={route.path} {...route}/>
                })}
                <Redirect to='/admin' from='/'/>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();