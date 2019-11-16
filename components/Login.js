import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, HelperText, Button, Snackbar } from "react-native-paper";
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';

import Navigation from './Navigation.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database();
        this.state = {
            name: "Anonymous",
            isShowLogin: true,
            email: "",
            password: "",
            login: false,
            snack: false
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
                this.setState({ isShowLogin: true });
                console.log("Created user successfully");
                this.setState({ snack: true });
                this.snack(this.state.email, 'OK')
            })
            .catch(error => {
                this.setState({ snack: true });
                this.snack('', '404')
                // alert("An error occured: " + error.message);
                console.log("An error occured", error.message);
            });
    }

    snack(user, message) {
        if (this.state.snack && message !== '404') {
            return (<Snackbar
                style={{ justifyContent: 'space-between', backgroundColor: '#00B461' }}
                visible={this.state.snack}
                onDismiss={() => this.setState({ snack: false })}
                action={{
                    label: 'Yeah!',
                    onPress: () => {
                        this.setState({ snack: false })
                        this.redirect()
                    },
                }}
            >
                Welcome! {user}
            </Snackbar>)
        }
        else if (message == '404') {
            return (<Snackbar
                style={{ justifyContent: 'space-between', backgroundColor: '#B20000' }}
                visible={this.state.snack}
                onDismiss={() => this.setState({ snack: false })}
                action={{
                    label: 'Got it',
                    onPress: () => {
                        this.setState({ snack: false })
                    },
                }}
            >
                Account may be not existed or email/password incorrect
            </Snackbar>)
        }
    }
    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log("Login user successfully");
                console.log(user);
                console.log(this.state.login)
                this.setState({ snack: true });
                this.snack(this.state.email)
            })
            .catch(error => {
                this.setState({ snack: true });
                this.snack('', '404')
                // alert("An error occured: " + error.message);
                console.log("An error occured", error.message);
            });
    }

    redirect() {
        const { navigate } = this.props.navigation;
        navigate('Home')
    }
    forceUpdateHandler() {
        this.forceUpdate();
    };

    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Logout successfully");
                alert("Logout Successfully");
                this.setState({ login: false })
                this.setState({ snack: true });
                this.snack()
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

                        <Button style={styles.loginbutton} icon="login" mode="contained" onPress={this.login}>
                            Log in</Button>
                        <Button style={styles.loginbutton} icon="auto-fix" mode="contained" onPress={() => this.setState({ isShowLogin: false })}>
                            Don't have an account?</Button>

                    </View>

                </ScrollView>);
        } else if (!this.state.isShowLogin) {
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
                            visible={false}
                        >
                            Don't show your password to others!
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
                        <Button style={styles.loginbutton} icon="lead-pencil" mode="contained" onPress={this.register}>
                            Register</Button>
                        <Button style={styles.loginbutton} icon="login" mode="contained" onPress={() => this.setState({ isShowLogin: true })}>
                            Already have an account?</Button>
                    </View>
                </ScrollView>);
        } else if (this.state.login) {
            authUI = (
                <ScrollView style={styles.loginpanel}>
                    <Navigation />
                    <TouchableOpacity style={styles.loginbutton} onPress={this.logout}>
                        <Text style={styles.loginbuttontext}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>)
        } return (
            <ScrollView style={styles.loginpanel}>
                <View style={styles.loginpanel}>{authUI}</View>
                {this.snack()}
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