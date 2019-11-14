import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import _ from 'lodash';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from './Navigation.js';

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            allbooks: []
        }
    }

    renderBooks(isbn) {
        if (isbn.length == 0) {
            return (<Text style={styles.notfound}>Sorry We don't have that book right now :(</Text>);
        }
        let panel = [];
        isbn.map((key) => {
            Object.keys(key).map(obj =>
                panel.push(
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={{ uri: key[obj].cover }}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: obj })}>{key[obj].nameth}</Text>
                            <Text style={styles.author}>{key[obj].author}</Text>
                        </View>
                    </View>)
            );
        }

        );
        return panel;


    }



    render() {
        // const { params } = this.props.navigation.state;
        // const { isbn } = params ? params.isbn : null;
        const isbn = this.props.navigation.getParam('isbn', []);
        console.log(typeof (isbn));
        console.log("2", isbn)
        var array = JSON.parse(isbn);

        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <View style={styles.bookpanel}>
                        {this.renderBooks(array)}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    hotbar: {
        marginTop: 50,
    },
    choicename: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 30,
        marginBottom: 30
    },
    bookpanel: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detail: {
        marginLeft: 20,
        marginRight: 15,
        marginBottom: 25
    },
    detailtext: {
        width: 150
    },
    bookcover: {
        width: 150,
        height: 250,
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center'
    },
    notfound: {
        marginTop: 30,
        textAlign: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginBottom: 30
    },
});