import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableHighlight } from "react-native";
import Navigation from './Navigation.js';
import * as firebase from 'firebase';
import _ from 'lodash';
import config from '../firebase/config.js';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.state = {
            books: []
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const key = params ? params.key : null;
        firebase.database().ref('books/' + key).once('value', (snap) => {
            this.setState({ books: snap.val() })
        })
        console.log("state" + this.state.books);
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
                        <View style={{ flexDirection: 'row', marginBottom: 40, }}>
                            <TextInput keyboardType='phone-pad' style={styles.amount} />
                            {/* <TouchableHighlight style={styles.amountbutton}><Text style={styles.cartbuttontext}>เพิ่มในรถเข็น</Text></TouchableHighlight> */}
                            <Button style={styles.amountbutton} icon="cart" mode="contained" onPress={() => console.log('Pressed')}>
                                Add to cart
  </Button>
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
        color: 'red',
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
        color: 'red',
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
        backgroundColor: '#922B21',
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