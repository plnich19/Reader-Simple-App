import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import Navigation from './components/Navigation.js';
import TrendingBar from './components/TrendingBar.js';
import HotBook from './components/HotBook.js';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Navigation />
      <TrendingBar />
      <HotBook />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

