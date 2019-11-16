import React, { Component } from "react";
//import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { Provider } from 'react-redux'
//import logger from 'redux-logger'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import Navigator from './components/Navigator.js';

//import productReducer from './reducers/productReducer.js';

import HomeScreen from './components/HomeScreen.js';
import BookDetail from './components/BookDetail.js';
import Login from './components/Login.js';
import Find from './components/Find.js';
import myCart from './components/myCart.js';
import Submit from './components/Submit.js'
import Submit2 from './components/Submit2.js'

//const store = createStore(productReducer, applyMiddleware(logger));

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail,
  Login: Login,
  Find: Find,
  myCart: myCart,
  Submit: Submit,
  Submit2: Submit2,

},
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      //<Provider store={store}>
      <AppContainer />
      //</Provider>

    );
  }
}


