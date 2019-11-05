import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import Navigation from './Navigation.js';
import TrendingBar from './TrendingBar.js';
import HotBook from './HotBook.js';

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Navigation />
                <TrendingBar />
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

