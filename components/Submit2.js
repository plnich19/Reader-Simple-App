import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import _ from 'lodash';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from './Navigation.js';
//import { Button } from "react-native-paper";

export default class Submit2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const status = params ? params.status : null;
        console.log('status', status)
        this.setState({ status: status })
    }

    render() {
        const { params } = this.props.navigation.state;
        const status = params ? params.status : null;
        console.log('status', status)

        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <View style={styles.bookpanel}>
                        <Text>{this.state.status}</Text>
                    </View>
                    <Button onPress={() => this.props.navigation.goBack()}>Back</Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    hotbar: {
        marginTop: 50,
    },
    choicename: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 30,
        marginBottom: 30
    },
    bookpanel: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detail: {
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 25
    },
    detailtext: {
        width: 150
    },
    bookcover: {
        width: 150,
        height: 250,
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center'
    },
    notfound: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginBottom: 30
    },
});