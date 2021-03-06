import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Snackbar } from 'react-native-paper'
import Emoji from 'react-native-emoji';
import * as firebase from 'firebase';
import _ from 'lodash';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from './Navigation.js';

export default class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            bug: null
        }
    }

    // componentWillMount() {
    //     const { params } = this.props.navigation.state;
    //     const status = params ? params.status : null;
    //     const index = params ? params.index : null;
    //     const length = params ? params.length : null;
    //     const uid = params ? params.uid : null;
    //     console.log('status', status)
    //     this.setState({ status: status })
    //     // firebase.database().ref('user/' + uid + '/cart/').remove().then(function (data) {
    //     //     console.log("delete cart")
    //     // }).catch((error) => {
    //     //     console.log("error deducted", error)
    //     // })
    // }

    renderText = () => {
        // const { params } = this.props.navigation.state;
        // const status = params ? params.status : null;
        // const index = params ? params.index : null;
        // const length = params ? params.length : null;
        // console.log('status', status)
        // console.log("index", index)
        // console.log("l", length)
        // if (index == length - 1) {
        // if (status) {
        return (<View style={{ justifyContent: 'center', alignItems: 'center' }}><Emoji name="tada" style={{ fontSize: 50, justifyContent: 'center' }} />
            <Text style={styles.notfound}>Thank you for Your Purchase!</Text></View>)
        // }
        // else {
        //     return (<View style={{ justifyContent: 'center', alignItems: 'center' }}><Emoji name="disappointed_relieved" style={{ fontSize: 50 }} />
        //         <Text style={styles.notfound}>Oops! Sorry. Purchase can't not be done Plaase check your cart again</Text></View>)
        // }
        // }
    }

    render() {
        // const { params } = this.props.navigation.state;
        // const status = params ? params.status : null;
        // console.log('status', status)

        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <View style={styles.bookpanel}>
                        {this.renderText()}
                    </View>

                    <View style={{ marginLeft: 25, marginRight: 25, marginTop: 25, alignItems: 'center' }} >
                        <Button icon="arrow-left-box" mode="contained" onPress={() => this.props.navigation.goBack()}>
                            BACK
                </Button></View>
                    {/* <View>

                    <Text style={}></Text>
                    </View> */}
                    <View style={{ marginLeft: 25, marginRight: 25, marginTop: 25, alignItems: 'center' }} >
                        <Button icon="home" mode="contained" onPress={() => this.props.navigation.navigate('Home'
                        )}>
                            HOME
                </Button></View>
                    {/* <Button onPress={() => this.props.navigation.goBack()}><Text>Back</Text></Button> */}

                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    hotbar: {
        flex: 1,
        marginTop: 50,
    },
    choicename: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 30,
        marginBottom: 30
    },
    bookpanel: {
        flexDirection: 'column',
        flexWrap: 'wrap'
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
        marginBottom: 30
    },
});