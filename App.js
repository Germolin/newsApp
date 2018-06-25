import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from './src/components/CustomHeader'; 
import NewsList from './src/components/newsList';
import LoginForm from './src/components/loginForm'
import firebase from "firebase";
import { Button, Spinner } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import Router from "./src/router"

console.ignoredYellowBox = [
  'Setting a timer'
];

type Props = {};

export default class App extends Component<Props> {

  state = { loggedIn:  null }
  ReduxStore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDLYd0i9B0EIPSAQ-iIEmKoaK0Ee9ULYmk",
      authDomain: "news-auth.firebaseapp.com",
      databaseURL: "https://news-auth.firebaseio.com",
      projectId: "news-auth",
      storageBucket: "news-auth.appspot.com",
      messagingSenderId: "404773573196"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderLogger() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <Button onPress={() => firebase.auth().signOut()}>
          <Text>Log Out</Text>
        </Button>
        )
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large'/>
    };

  }

  render() {
    return (
      <Provider store={this.ReduxStore}>
        <View style={{flex: 1}}>
          <Router />
        </View>
      </Provider>

    );
  }
}
