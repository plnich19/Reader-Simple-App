import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/HomeScreen.js';
import BookDetail from './components/BookDetail.js';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  BookDetail: BookDetail
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


