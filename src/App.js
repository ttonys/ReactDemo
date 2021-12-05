import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {Redirect, Route, Switch} from "react-router-dom";
import {adminRoutes} from "./routes";
import Frame from './components/Frame/index'
import {isLogin} from "./utils/auth";

class App extends Component {
    render() {
        return ( isLogin() ?
            <Frame>
                <Switch>
                    {
                        adminRoutes.map(route => {
                            return(
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    render={routeProps => {
                                        return <route.component {...routeProps} />;
                                    }}
                                />
                            )
                        })
                    }
                    <Redirect to={adminRoutes[0].path} from="/admin"/>
                    <Redirect to="/404" />
                </Switch>
            </Frame>:<Redirect to="/login"/>
        );
    }
}

export default App;
