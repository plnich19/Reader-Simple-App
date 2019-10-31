import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View stlye={styles.container}>
      <View style={styles.navigation}>
        <Image
          style={styles.logo}
          source={require("./assets/src/readery.jpg")}
        />
        <Image style={styles.menu} source={require("./assets/src/menu.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  logo: {
    marginLeft: 10,
    width: 100,
    height: 50
  },
  menu: {
    width: 20,
    height: 20
  }
});
