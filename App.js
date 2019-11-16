import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen.js';
import BookDetail from './components/BookDetail.js';
import Login from './components/Login.js';
import Find from './components/Find.js';
import myCart from './components/myCart.js';
import Submit from './components/Submit.js'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail,
  Login: Login,
  Find: Find,
  myCart: myCart,
  Submit: Submit,

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


