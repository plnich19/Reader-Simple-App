import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
                    name: "Anonymous",
                    login: false
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

    // for lab: add logout function
    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Logout successfully");
                alert("Logout Successfully");
                this.setState({ login: false })
                this.redirect();
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured: " + error.message);
            });
    }

    redirect() {
        const { navigate } = this.props.navigation;
        navigate('Home')
    }

    SignInToggle() {
        if (this.state.login) {
            return (<View>
                <TouchableHighlight style={styles.loginbutton}><Text style={styles.loginbuttontext}>My Cart</Text></TouchableHighlight>
                <TouchableHighlight style={styles.loginbutton} onPress={this.logout}><Text style={styles.loginbuttontext}>Logout</Text></TouchableHighlight></View>)
        }
        else {
            return (<TouchableHighlight style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.loginbuttontext}>Log in/Sign up</Text></TouchableHighlight>)
        }
    }
    state = {
        search: '',
    };
    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (<View style={styles.menupanel}>
            <SearchBar
                keyboardType='default'
                containerStyle={{ backgroundColor: 'black' }}
                placeholder="Search Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
            <TouchableHighlight style={styles.loginbutton}>
                <Text style={styles.loginbuttontext}>Search</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginbuttontext}>Log in/Sign up</Text>
            </TouchableHighlight> */}
            {this.SignInToggle()}
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