import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./components/loginForm";
import NewsList from "./components/newsList";
import MenuComponent from './components/menuComponent';
import ConfigComponent from './components/config';

const RouterCompponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
              <Scene key="auth">
                <Scene key="login" component={LoginForm} hideNavBar initial/>
              </Scene>
              <Scene key="main">
                <Scene key="menu" component={NewsList} hideNavBar title="News" />
                <Scene key="config" component={ConfigComponent} title="Edit" />
              </Scene>
            </Scene>
        </Router>
    );
};

export default RouterCompponent;