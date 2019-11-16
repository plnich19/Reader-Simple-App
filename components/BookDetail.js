import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableHighlight } from "react-native";
import Navigation from './Navigation.js';
import * as firebase from 'firebase';
import _ from 'lodash';
import config from '../firebase/config.js';
import API from "../API.js";

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.state = {
            books: [],
            login: false,
            amount: 0,
            name: '',
            add: false
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
        const { params } = this.props.navigation.state;
        const key = params ? params.key : null;
        firebase.database().ref('books/' + key).once('value', (snap) => {
            this.setState({ books: snap.val() })
        })
        console.log("state" + this.state.books);
    }

    updateAmount = amount => {
        this.setState({ amount });
    };
    checklogin() {
        const { params } = this.props.navigation.state;
        const key = params ? params.key : null;
        if (this.state.login) {
            return (<View style={{ flexDirection: 'row', marginBottom: 40, }}><TextInput keyboardType='phone-pad' style={styles.amount} onChangeText={this.updateAmount} value={this.state.amount} />
                <Button style={styles.amountbutton} icon="cart" mode="contained" onPress={() => this.addtoCart(
                    key, this.state.books.nameth,
                    this.state.books.nameen,
                    this.state.books.author,
                    this.state.books.price,
                    this.state.books.cover)}>
                    Add to cart
</Button></View>)
        }
        else {
            return (<View style={{ marginTop: 20, marginLeft: 10 }}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Please log in first to purchase books</Text></View>)
        }
    }

    addtoCart(key, nameth, nameen, author, price, cover) {
        if (parseInt(this.state.amount) <= this.state.books.stock) {
            var user = firebase.auth().currentUser;
            if (user != null) {
                var uid = user.uid;
            }
            console.log("uid = ", uid)
            firebase.database().ref('user/' + uid + '/cart/' + key).set({
                amount: parseInt(this.state.amount),
                nameth: nameth,
                nameen: nameen,
                author: author,
                price: price,
                cover: cover
            }).then((res) => {
                console.log("added")
            }).catch((error) => {
                console.log("error added", error)
            })
        }
        else {
            alert('YOUR PURCHASE EXCEED OUR STOCK')
        }


        console.log("key", key)
        console.log("amonth = ", this.state.amount)
        console.log("email = ", this.state.name)
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Navigation />
                <View style={styles.BookDesc1}>
                    <View style={styles.titlepanel}>
                        <Text style={styles.Titleth}>{this.state.books.nameth}</Text>
                        <Text style={styles.Titleen}>{this.state.books.nameen}</Text>
                        <Text style={styles.author}>{this.state.books.author}</Text>
                    </View>
                    <View style={styles.coverpanel}>
                        <Image style={styles.bookcover} source={{ uri: this.state.books.cover }}>
                        </Image>
                    </View>
                    <View style={styles.pricepanel}>
                        <View style={styles.pricetext}>
                            <Text style={styles.price}>{this.state.books.price}</Text>
                            <Text style={{ marginTop: 30 }}>บาท</Text>
                        </View>
                        <View>
                            {this.checklogin()}
                        </View>
                        <View style={styles.pricetext}>
                            <Text style={{ marginTop: 10, marginLeft: 10, marginBottom: 40 }}>จำนวนของที่มี : </Text>
                            <Text style={{ marginTop: 12, color: 'red', fontWeight: 'bold', marginBottom: 40 }}>{this.state.books.stock}</Text>
                        </View>
                    </View>
                    <View style={styles.other}>
                        <Text style={styles.othertext}>Other Information</Text>
                        <Text style={styles.isbn}>ISBN : {this.state.books.isbn}</Text>
                    </View>
                </View>
            </ScrollView >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    BookDesc1: {
        flexDirection: 'column',
        backgroundColor: '#FBFCFC',
    },
    BookDesc2: {
        backgroundColor: 'white',
    },
    Titlepanel: {
        marginTop: 40,
        marginBottom: 40
    },
    coverpanel: {
        marginTop: 60
    },
    Titleth: {
        fontSize: 30,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    Titleen: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    author: {
        color: '#009DFF',
        fontSize: 20,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    bookcover: {
        width: 300,
        height: 500,
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    pricepanel: {
        width: 300,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#D0D8D8',
        marginTop: 40,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'center'
    },
    pricetext: {
        flexDirection: 'row'
    },
    price: {
        fontSize: 29,
        color: '#009DFF',
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    amount: {
        marginTop: 30,
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#D0D8D8',
    },
    amountbutton: {
        marginTop: 30,
        marginLeft: 10,
        // backgroundColor: '#922B21',
        height: 40,
        justifyContent: 'center',
    },
    cartbuttontext: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        width: 100
    },
    other: {
        marginTop: 90,
        backgroundColor: '#EBEDEF'

    },
    othertext: {
        marginTop: 20,
        marginLeft: 15,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    isbn: {
        marginBottom: 20,
        marginLeft: 15,
        fontSize: 15
    }
});