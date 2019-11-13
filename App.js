import React, { Component } from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen.js';
import BookDetail from './components/BookDetail.js';
import Login from './components/Login.js';
import AfterLogout from './components/AfterLogout.js'
import FindScreen from './components/FindScreen.js';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail,
  Login: Login,
  Find: FindScreen
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


