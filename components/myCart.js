import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import _ from 'lodash';
import config from '../firebase/config.js';
import Emoji from 'react-native-emoji';
import Navigation from './Navigation.js';

export default class myCart extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.state = {
            carts: [],
            login: false,
            amount: '',
            name: '',
            uid: ''
        }
    }

    listenForAuthChange() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("auth changed");
            if (user) {
                this.setState({ login: true, name: user.email })
            } else {
                console.log("no one is signed in ");
                this.setState({
                    name: "Anonymous",
                    login: false
                });
            }
        }
        )
    }

    componentDidMount() {
        this.listenForAuthChange();
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        if (uid != null) {
            // var userinfo = firebase.auth().currentUser;
            // if (userinfo != null) {
            //     var uid = userinfo.uid;
            //     console.log("User details", userinfo);
            // this.setState({ uid: uid }, () => {
            firebase.database().ref('user/' + uid + '/cart/').once('value', (snap) => {
                console.log(snap.val())
                const data = snap.val()
                this.setState({
                    carts: data
                });
            });
            // })
        }
    }

    renderCarts() {
        let carts = [];
        if (this.state.carts) {
            Object.keys(this.state.carts).map((key, index) => {
                carts.push(<View key={key} style={styles.detail}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>
                        <Image style={styles.bookcover} source={{ uri: this.state.carts[key].cover }}></Image>
                    </TouchableOpacity>
                    <View style={styles.detailtext}>
                        <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.carts[key].nameth}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.carts[key].author}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.carts[key].amount}</Text>
                    </View>
                </View>)
            })
            return carts;
        }
    }

    render() {
        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <Text style={styles.choicename}>Your cart <Emoji name="books" style={{ fontSize: 20 }} /></Text>
                    <View style={styles.bookpanel}>
                        {this.renderCarts()}
                    </View>
                </View>
            </ScrollView>
        );
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
    }, bookpanel: {
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
        fontWeight: 'bold',
        color: 'black'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center'
    }
})