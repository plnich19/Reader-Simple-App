import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as firebase from 'firebase';
import _ from 'lodash';
import config from '../firebase/config.js';
import API from '../API.js';
import Emoji from 'react-native-emoji';

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
        }
    }

    listenForAuthChange() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("auth changed");
            if (user) {
                console.log("User details", user);
                this.setState({ login: true, name: user.email });

            } else {
                console.log("no one is signed in ");
                this.setState({
                    name: "Anonymous",
                    login: false
                });
            }
        });
    }
    componentDidMount() {
        this.listenForAuthChange();
    }

    componentWillMount() {
        //     const { params } = this.props.navigation.state;
        //     const key = params ? params.key : null;
        //     firebase.database().ref('books/' + key).once('value', (snap) => {
        //         this.setState({ carts: snap.val() })
        //     })
        //     console.log("state" + this.state.books);
        // }

        render() {
            return (

        );
        }
    }

    const styles = StyleSheet.create({})