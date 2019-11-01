import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import TrendingBar from './components/TrendingBar.js';

export default function App() {
  return (
    <TrendingBar />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
