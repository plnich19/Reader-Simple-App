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
import myCart2 from './components/myCart2.js'
import myCart3 from './components/myCart3.js'
import myCart4 from './components/myCart4.js'
import myCart5 from './components/myCart5.js'
import myCart6 from './components/myCart6.js'
import myCart7 from './components/myCart7.js'
import myCart8 from './components/myCart8.js'
import myCart9 from './components/myCart9.js'
import myCart10 from './components/myCart10.js'
import myCart11 from './components/myCart11.js'
import myCart12 from './components/myCart12.js'

//const store = createStore(productReducer, applyMiddleware(logger));

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail,
  Login: Login,
  Find: Find,
  myCart: myCart,
  myCart2: myCart2,
  myCart3: myCart3,
  myCart4: myCart4,
  myCart5: myCart5,
  myCart6: myCart6,
  myCart7: myCart7,
  myCart8: myCart8,
  myCart9: myCart9,
  myCart10: myCart10,
  myCart11: myCart11,
  myCart12: myCart12

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


