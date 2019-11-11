import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/HomeScreen.js';
import BookDetail from './components/BookDetail.js';
import Login from './components/Login.js';

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDz5sdReRMNZzCwLni3agUUyYiGSyeS-ZI",
  authDomain: "reader-simple-app.firebaseapp.com",
  databaseURL: "https://reader-simple-app.firebaseio.com",
  projectId: "reader-simple-app",
  storageBucket: "reader-simple-app.appspot.com",
  messagingSenderId: "134896125592",
  appId: "1:134896125592:web:7b690c33a5d563a9d3b2ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail,
  Login: Login
},
  {
    initialRouteName: 'Home',
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}


