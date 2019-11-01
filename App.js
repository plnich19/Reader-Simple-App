import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import Navigation from './components/Navigation.js';

export default function App() {
  return (
    <View stlye={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
