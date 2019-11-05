import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableHighlight } from "react-native";
import Navigation from './Navigation.js';
import TrendingBar from './TrendingBar.js';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Navigation />
                <TrendingBar />
                <View style={styles.BookDesc1}>
                    <View style={styles.titlepanel}>
                        <Text style={styles.Titleth}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                        <Text style={styles.Titleen}>Homo Deus: A Brief History of Tomorrow</Text>
                        <Text style={styles.author}>Yuval Noah Harari</Text>
                    </View>
                    <View style={styles.coverpanel}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}>
                        </Image>
                    </View>
                    <View style={styles.pricepanel}>
                        <View style={styles.pricetext}>
                            <Text style={styles.price}>468.00</Text>
                            <Text style={{ marginTop: 30 }}>บาท</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 40, }}>
                            <TextInput keyboardType='phone-pad' style={styles.amount} />
                            <TouchableHighlight style={styles.amountbutton}><Text style={styles.cartbuttontext}>เพิ่มในรถเข็น</Text></TouchableHighlight>
                        </View>
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
    }
});
