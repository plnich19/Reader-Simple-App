import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";

import Navigation from './Navigation.js';
import HotBook from './HotBook.js';

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Navigation navigation={this.props.navigation} />
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

