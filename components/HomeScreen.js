import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import Navigation from './Navigation.js';
import TrendingBar from './TrendingBar.js';
import HotBook from './HotBook.js';
import Find from './Find.js';

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Navigation navigation={this.props.navigation} />
                {/* <TrendingBar /> */}
                <HotBook navigation={this.props.navigation} />

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

