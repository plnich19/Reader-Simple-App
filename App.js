import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { wrap } from "module";

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
      <View style={styles.bookchoicebar}>
        <Image style={styles.menu2} source={require("./assets/src/menu2.png")} />
        <View style={styles.trending}>
          <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>New Arrivals</Text></TouchableHighlight>
          <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>Best Sellers</Text></TouchableHighlight>
          <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>Readery Podcast</Text></TouchableHighlight>
          <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>SALE</Text></TouchableHighlight>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  bookchoicebar: {
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#D0D8D8'
  },
  bookchoicebutton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    marginRight: 20

  },
  bookchoicetext: {
    fontWeight: 'bold'
  },
  logo: {
    marginTop: 20,
    marginLeft: 10,
    width: 200,
    height: 100
  },
  menu: {
    marginTop: 20,
    width: 20,
    height: 20,
    marginRight: 40
  },
  menu2: {
    marginTop: 20,
    width: 40,
    height: 40,
    marginLeft: 20,
    marginBottom: 20
  },
  trending: {
    paddingLeft: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
