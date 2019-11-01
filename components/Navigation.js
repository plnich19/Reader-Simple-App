import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Navigation extends Component {
    render() {
        return (<View style={styles.navigation}>
            <Image
                style={styles.logo}
                source={require("../assets/src/readery.jpg")}
            />
            <Image style={styles.menu} source={require("../assets/src/menu.png")} />
        </View>);
    }
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
});