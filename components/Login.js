import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight } from "react-native";
import Navigation from './Navigation.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: ''
    };
    updateUsername = username => {
        this.setState({ username });
    };
    updatePassword = password => {
        this.setState({ password });
    };
    render() {
        const { username, password } = this.state;
        return (
            <ScrollView style={styles.loginpanel}>
                <Navigation />
                <Text style={styles.logintext}>Login/Sign up</Text>
                <View style={styles.inputbar}>
                    <Text style={styles.username}>Username/Email</Text>
                    <TextInput style={styles.input}
                        onChangeText={this.updateUsername}
                        value={username}
                        autoCompleteType='username'></TextInput>
                    <Text style={styles.username}>Password</Text>
                    <TextInput style={styles.input}
                        onChangeText={this.updatePassword}
                        value={password}
                        autoCompleteType='password'></TextInput>
                    <TouchableHighlight style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.loginbuttontext}>Log in/Sign up</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    loginpanel: {
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
    },
    logintext: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    inputbar: {
        marginTop: 10,
        justifyContent: 'center'
    },
    username: {
        marginTop: 10,
        marginLeft: 40,
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 0.5,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        fontSize: 20,
        backgroundColor: 'white'
    },
    loginbutton: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: 'black'
    },
    loginbuttontext: {

        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});