import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation.js';
import * as firebase from 'firebase';
import auth from '../firebase';
import Menu from "./Menu.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database();
        this.state = {
            name: "Anonymous",
            isShowLogin: true,
            email: "",
            password: "",
            login: false
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.listenForAuthChange = this.listenForAuthChange.bind(this);
    }
    listenForAuthChange() {
        firebase.auth().onAuthStateChanged(user => {
            console.log("auth changed");
            if (user) {
                console.log("User details", user);
                this.setState({ name: user.email });

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
    register() {
        console.log(this.state.email, this.state.password);
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                this.setState({ isShowLogin: true, modalVisible: false });
                console.log("Created user successfully");
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured", error.message);
            });
    }

    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log("Login user successfully");
                console.log(user);
                console.log(this.state.login)
                this.redirect()
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured", error.message);
            });
    }

    redirect() {
        const { navigate } = this.props.navigation;
        alert('Welcome! ' + this.state.email)
        navigate('Home')
    }
    forceUpdateHandler() {
        this.forceUpdate();
    };

    // for lab: add logout function
    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Logout successfully");
                alert("Logout Successfully");
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured: " + error.message);
            });
    }

    updateUsername = email => {
        this.setState({ email });
    };
    updatePassword = password => {
        this.setState({ password });
    };

    render() {
        let authUI;
        if (this.state.isShowLogin) {
            authUI = (
                <ScrollView style={styles.loginpanel}>

                    <Navigation />

                    <Text style={styles.logintext}>Login/Sign up</Text>
                    <View style={styles.inputbar}>
                        <TextInput style={styles.input}
                            label='Email'
                            onChangeText={this.updateUsername}
                            keyboardType='email-address'
                            value={this.state.email}
                            mode='outlined'
                            selectionColor='red'
                            theme={{
                                colors: {
                                    placeholder: 'grey', text: 'black', primary: 'red',
                                    underlineColor: 'transparent', background: '#003489'
                                }
                            }}></TextInput>
                        <HelperText
                            style={{ marginLeft: 28, marginTop: 5 }}
                            type="error"
                            visible={this.state.email != "" && !this.state.email.includes('@')}
                        >
                            Please type correct form of email (@)
                         </HelperText>
                        <TextInput style={styles.input}
                            label='Password'
                            secureTextEntry={true}
                            onChangeText={this.updatePassword}
                            value={this.state.password}
                            mode='outlined'
                            selectionColor='red'
                            theme={{
                                colors: {
                                    placeholder: 'grey', text: 'black', primary: 'red',
                                    underlineColor: 'transparent', background: '#003489'
                                }
                            }} ></TextInput>
                        <TouchableOpacity style={styles.loginbutton} onPress={this.login}>
                            <Text style={styles.loginbuttontext}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginbutton} onPress={() => this.setState({ isShowLogin: false })}>
                            <Text style={styles.loginbuttontext}>Don't have an account?</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>);
        }
        else if (!this.state.isShowLogin) {
            authUI = (
                <ScrollView style={styles.loginpanel}>

                    <Navigation />

                    <Text style={styles.logintext}>Login/Sign up</Text>
                    <View style={styles.inputbar}>
                        <TextInput style={styles.input}
                            label='Email'
                            onChangeText={this.updateUsername}
                            keyboardType='email-address'
                            value={this.state.email}
                            mode='outlined'
                            selectionColor='red'
                            theme={{
                                colors: {
                                    placeholder: 'grey', text: 'black', primary: 'red',
                                    underlineColor: 'transparent', background: '#003489'
                                }
                            }}></TextInput>
                        <TextInput style={styles.input}
                            label='Password'
                            secureTextEntry={true}
                            onChangeText={this.updatePassword}
                            value={this.state.password}
                            mode='outlined'
                            selectionColor='red'
                            theme={{
                                colors: {
                                    placeholder: 'grey', text: 'black', primary: 'red',
                                    underlineColor: 'transparent', background: '#003489'
                                }
                            }} ></TextInput>
                        <TouchableOpacity style={styles.loginbutton} onPress={this.register}>
                            <Text style={styles.loginbuttontext}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginbutton} onPress={() => this.setState({ isShowLogin: true })}>
                            <Text style={styles.loginbuttontext}>Already have an account?</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>);
        }
        else if (this.state.login) {
            authUI = (
                <ScrollView style={styles.loginpanel}>

                    <Navigation />
                    <TouchableOpacity style={styles.loginbutton} onPress={this.logout}>
                        <Text style={styles.loginbuttontext}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>)
        }
        return (
            <ScrollView style={styles.loginpanel}>

                <View style={styles.loginpanel}>{authUI}</View>

            </ScrollView>
        )
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
        // borderRadius: 4,        justifyContent: 'center'

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