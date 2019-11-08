import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation.js';

class Login extends Component {
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
                    <TextInput style={styles.input}
                        label='Username'
                        onChangeText={this.updateUsername}
                        value={username}
                        mode='outlined'
                        selectionColor='red'
                        theme={{
                            colors: {
                                placeholder: 'black', text: 'black', primary: 'red',
                                underlineColor: 'transparent', background: '#003489'
                            }
                        }}></TextInput>
                    <TextInput style={styles.input}
                        label='Password'
                        onChangeText={this.updatePassword}
                        value={password}
                        mode='outlined'
                        selectionColor='red'
                        theme={{
                            colors: {
                                placeholder: 'black', text: 'black', primary: 'red',
                                underlineColor: 'transparent', background: '#003489'
                            }
                        }} ></TextInput>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.loginbuttontext}>Log in/Sign up</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    loginpanel: {
        flex: 1,
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
        // borderColor: 'black',
        // borderRadius: 4,
        // borderWidth: 0.5,
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
        backgroundColor: 'black',
        height: 40,
        justifyContent: 'center'
    },
    loginbuttontext: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%'
    }
});
export default withNavigation(Login);