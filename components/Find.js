import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import _ from 'lodash';

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        }
    }


    componentWillMount() {
        const { params } = this.props.navigation.state;

        this.setState({ books: params.books })

        console.log("state" + this.state.books);
    }
    renderBooks() {
        let panel = [];
        if (this.state.books) {
            Object.keys(this.state.books).map((key, index) => {
                panel.push(<View key={key} style={styles.detail}>
                    <Image style={styles.bookcover} source={{ uri: this.state.books[key].cover }}></Image>
                    <View style={styles.detailtext}>
                        <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.books[key].nameth}</Text>
                        <Text style={styles.author}>{this.state.books[key].author}</Text>
                    </View>
                </View>)
            })
            return panel;
        }
    }

    render() {
        return (
            <View style={styles.hotbar}>
                <Text style={styles.choicename}>Hooray! Found your book!</Text>
                <View style={styles.bookpanel}>
                    {this.renderBooks()}
                </View>
            </View>
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
    }
});