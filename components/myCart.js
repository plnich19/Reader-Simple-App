import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import { TextInput, Button } from 'react-native-paper'
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
            uid: '',
            total: 0
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
                if (data != null) {
                    this.setState({
                        carts: data
                    });
                }
            });
            // })
        }
    }

    addItems(key) {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        firebase.database().ref('user/' + uid + '/cart/' + key).update({
            amount: this.state.carts[key].amount + 1
        }).then((res) => {
            let cartsCopy = JSON.parse(JSON.stringify(this.state.carts))
            //make changes to ingredients
            cartsCopy[key].amount = this.state.carts[key].amount + 1//whatever new ingredients are
            this.setState({
                carts: cartsCopy
            })
            console.log("added")
        }).catch((error) => {
            console.log("error added", error)
        })
    }

    deductItems(key) {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        firebase.database().ref('user/' + uid + '/cart/' + key).update({
            amount: this.state.carts[key].amount - 1
        }).then((res) => {
            let cartsCopy = JSON.parse(JSON.stringify(this.state.carts))
            //make changes to ingredients
            cartsCopy[key].amount = this.state.carts[key].amount - 1//whatever new ingredients are
            this.setState({
                carts: cartsCopy
            })
            console.log("deduct")
        }).catch((error) => {
            console.log("error deducted", error)
        })
    }


    deleteItems = async (key) => {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        //this.setState({ carts: [] });
        firebase.database().ref('user/' + uid + '/cart/' + key).remove().then(function (data) {
            console.log("delete")
        }).catch((error) => {
            console.log("error deducted", error)
        })
        //this.redirect(uid)
        firebase.database().ref('user/' + uid + '/cart/').once('value', (snap) => {
            console.log(snap.val())
            const data = snap.val()
            if (data != null) {
                this.setState({
                    carts: snap.val()
                });
            }
            else {
                this.setState({
                    carts: []
                })
            }
        }
        );
        //this.CalTotal()
    }

    redirect(uid) {
        const { navigate } = this.props.navigation;
        // alert('Welcome! ' + this.state.email)
        navigate('myCart2', { uid: uid })
    }

    renderCarts() {

        console.log("caetttttttt", this.state.carts);
        let carts = [];
        if (this.state.carts.length == 0) {
            return (<View style={{ justifyContent: 'center' }}>
                <Text style={styles.notfound}>Nothing in your carts right now</Text>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <Button styles={{ marginLeft: 20 }} icon="shopping" mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
                        Let's shop!
  </Button>
                </View></View>)
        }
        else {
            var total = 0;
            Object.keys(this.state.carts).map((key, index) => {
                carts.push(<View key={key} style={styles.detail}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>
                        <Image style={styles.bookcover} source={{ uri: this.state.carts[key].cover }}></Image>
                    </TouchableOpacity>
                    <View style={styles.detailtext}>
                        <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.carts[key].nameth}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.carts[key].author}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity style={styles.adddeductbutton} onPress={() => this.deductItems(
                            key)}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}> - </Text>
                        </TouchableOpacity>
                        <TextInput style={{ width: 40, height: 40, marginRight: 10 }} value={this.state.carts[key].amount.toString()}></TextInput>
                        <TouchableOpacity style={styles.adddeductbutton} onPress={() => this.addItems(
                            key)}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}> + </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.adddeductbutton} onPress={() => this.deleteItems(
                            key)}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}> x </Text>
                        </TouchableOpacity>
                        <View>

                        </View>
                    </View>
                </View>)

            })
            //this.setState({ total: this.state.total + this.state.carts[key].price });
            return carts;
        }
    }

    // Total

    CalTotal() {
        let total = 0;
        let carts = this.state.carts;
        Object.keys(carts).map((key, index) => {
            total = total + (carts[key].price * carts[key].amount);
        })
        if (total > 0) {
            return <Text style={styles.total}>Total: {total}</Text>;
        }
        else {
            return;
        }
        // Note: this will *not* work as intended.
    }

    render() {
        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <Text style={styles.choicename}>Your cart <Emoji name="books" style={{ fontSize: 20 }} /></Text>
                    <View style={styles.bookpanel}>
                        {this.renderCarts()}
                        {this.CalTotal()}
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
        marginLeft: 20,
        marginBottom: 30
    }, bookpanel: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    detail: {
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 25
    },
    detailtext: {
        width: 175
    },
    bookcover: {
        width: 50,
        height: 75,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 20
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
    },
    adddeductbutton: {
        backgroundColor: '#7001FA', width: 25, height: 25, marginRight: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 4
    },
    notfound: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30
    },
    total: {
        color: '#009DFF',
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 15
    }

})