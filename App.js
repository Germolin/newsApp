import React, { Component } from 'react';
import { View } from 'react-native';
import CustomHeader from './src/components/CustomHeader'; 
import NewsList from './src/components/newsList';
import LoginForm from './src/components/loginForm'
import firebase from "firebase";

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDLYd0i9B0EIPSAQ-iIEmKoaK0Ee9ULYmk",
      authDomain: "news-auth.firebaseapp.com",
      databaseURL: "https://news-auth.firebaseio.com",
      projectId: "news-auth",
      storageBucket: "news-auth.appspot.com",
      messagingSenderId: "404773573196"
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LoginForm />
      </View>
    );
  }
}
