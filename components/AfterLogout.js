import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import * as firebase from 'firebase';
import Navigation from './Navigation.js';

export default class AfterLogout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
        this.login = this.login.bind(this);
        this.listenForAuthChange = this.listenForAuthChange.bind(this);
    }
    listenForAuthChange() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("auth changed");
            if (user) {
                console.log("User details", user);
                this.setState({ login: true });
            } else {
                console.log("no one is signed in ");
                this.setState({
                    name: "Anonymous"
                });
            }
        });
    }
    componentDidMount() {
        this.listenForAuthChange();
    }

    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log("Login user successfully");
                console.log(user);
                this.setState({ modalVisible: false });
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured", error.message);
            });
    }


    render() {
        return (<View>
            <Navigation />
            <Text>YOU MAY NEED TO LOGIN BEFORE PURCHASING OUT PRODUCTS</Text>
            <Text>NO! JUST WANT TO EXPLORE</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    menupanel: {
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
        backgroundColor: 'black'
    },
    loginbutton: {
        flex: 1,
        backgroundColor: 'black'
    },
    loginbuttontext: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        justifyContent: 'center',
        width: '100%'
    }
});