import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Snackbar } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import API from '../API.js';
import { LinearGradient } from 'expo-linear-gradient';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            snack: false,
            uid: ''
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
                var userinfo = firebase.auth().currentUser;
                if (userinfo != null) {
                    var uid = userinfo.uid;
                    console.log("User details", userinfo);
                    this.setState({ uid: uid });
                }

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

    snack() {
        if (this.state.snack) {
            return (<Snackbar
                style={{ backgroundColor: '#B20000' }}
                visible={this.state.snack}
                onDismiss={() => this.setState({ snack: false })}
                action={{
                    label: 'OK',
                    onPress: () => {
                        this.setState({ snack: false })
                    },
                }}
            >
                See you again
            </Snackbar>)
        }
    }

    // for lab: add logout function
    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Logout successfully");
                // alert("Logout Successfully");
                this.setState({ login: false })
                this.setState({ snack: true });
                this.snack()
            })
            .catch(error => {
                alert("An error occured: " + error.message);
                console.log("An error occured: " + error.message);
            });
    }

    redirect(isbn, search) {
        // console.log("bookhe", isbn);
        const { navigate } = this.props.navigation;
        navigate('Find', {
            isbn: isbn,
            search: search
        })
    }

    SignInToggle() {
        if (this.state.login) {
            return (<View>
                <TouchableOpacity ><Text style={styles.loginbuttontext} onPress={() => this.props.navigation.navigate('myCart', { uid: this.state.uid })}>My Cart</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.logout}><Text style={styles.loginbuttontext}>Logout</Text></TouchableOpacity></View>)
        }
        else {
            return (<TouchableOpacity style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.loginbuttontext}>Log in/Sign up</Text></TouchableOpacity>)
        }
    }
    state = {
        search: '',
        books: [],
        ifSearch: false
    };
    updateSearch = search => {
        this.setState({ search });
    };

    findBook = async () => {
        if (this.state.search !== '') {
            await API('findBook', this.state.search).then((data) => {
                this.setState({ books: data, ifSearch: true })
                this.redirect(data, this.state.search);
                console.log("ชื่อนี่", data)
            })
        }
    }

    render() {
        const { search, ifSearch, books } = this.state;
        if (ifSearch) {
            this.setState({ ifSearch: false })
        }
        return (

            <View style={styles.menupanel}>

                <SearchBar
                    keyboardType='default'
                    containerStyle={{ backgroundColor: 'white' }}
                    inputContainerStyle={{ backgroundColor: '#E7EEEF' }}
                    inputStyle={{ color: '#1771FF' }}
                    icon={{ color: '#1771FF' }}
                    clearIcon={{ color: '#1771FF' }}
                    placeholder="Search Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme={true}
                    round={true}
                />
                <TouchableOpacity style={styles.loginbutton} onPress={() => this.findBook()}>
                    <Text style={styles.loginbuttontext}>Search</Text>
                </TouchableOpacity>
                {this.SignInToggle()}
            </View>);

    }
}

const styles = StyleSheet.create({
    menupanel: {
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    loginbutton: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#f931f9',

    },
    loginbuttontext: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        justifyContent: 'center',
        width: '100%'
    }
});