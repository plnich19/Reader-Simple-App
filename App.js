import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import Navigation from './components/Navigation.js';
import TrendingBar from './components/TrendingBar.js';
import HotBook from './components/HotBook.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false
    }
  }
  renderTopMenu() {
    if (this.state.menuToggle) {
      return <Text>STATEOK</Text>;
    }
    else {
      return;
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Navigation />
        {this.renderTopMenu()}
        <TrendingBar />
        <HotBook />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

