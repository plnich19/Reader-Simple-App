import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from "react-native";
import Navigation from './components/Navigation.js';
import TrendingBar from './components/TrendingBar.js';

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
                    <Image style={styles.bookcover} Source={require('../assets/src/book1.jpg')}>
                    </Image>
                    <View style={styles.pricepanel}>
                        <Text style={styles.price}>468.00 บาท</Text>
                    //FORM INPUT FIELD
                    //TouchableHighlight เพิ่มในรถเข็น
                    </View>
                    <Text>'โฮโมดิอุสจากผู้เขียน 'เซเปียนส์''</Text>
                </View>
                <View style={styles.BookDesc2}>
                    <Text>1234Desc</Text>
                </View>
            //ข้อมูลหนังสือ panel
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    BookDesc1: {
        flexDirection: 'column',
        backgroundColor: E8EEEE,
    },
    BookDesc2: {
        backgroundColor: 'white',
    },
    Titlepanel: {
        marginTop: 40
    },
    Titleth: {
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    Titleen: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    bookcover: {
        width: 250,
        height: 350,
        marginTop: 100,
        marginBottom: 100,
        alignItems: 'center'
    },
    pricepanel: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#D0D8D8'
    },
    price: {
        fontSize: 29,
        color: 'red'
    }
});
