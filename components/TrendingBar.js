import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class TrendingBar extends Component {
    render() {
        return (<View style={styles.bookchoicebar}>
            <Image style={styles.menu} source={require("../assets/src/menu2.png")} />
            <View style={styles.trending}>
                <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>New Arrivals</Text></TouchableHighlight>
                <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>Best Sellers</Text></TouchableHighlight>
                <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>Readery Podcast</Text></TouchableHighlight>
                <TouchableHighlight style={styles.bookchoicebutton}><Text style={styles.bookchoicetext}>SALE</Text></TouchableHighlight>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
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
        marginTop: 20,
        marginRight: 20

    },
    bookchoicetext: {
        fontWeight: 'bold'
    },
    menu: {
        marginTop: 10,
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