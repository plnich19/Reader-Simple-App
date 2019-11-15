import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as firebase from 'firebase';
import _ from 'lodash';
import config from '../firebase/config.js';
import Emoji from 'react-native-emoji';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HotBook extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.state = {
            books: [],
        }
    }
    componentWillMount() {
        firebase.database().ref('books/').once('value', (snap) => {
            this.setState({ books: snap.val() })
        })
    }
    renderBooks() {
        let books = [];
        if (this.state.books) {
            Object.keys(this.state.books).map((key, index) => {
                books.push(<View key={key} style={styles.detail}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>
                        <Image style={styles.bookcover} source={{ uri: this.state.books[key].cover }}></Image>
                    </TouchableOpacity>
                    <View style={styles.detailtext}>
                        <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.books[key].nameth}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{this.state.books[key].author}</Text>
                    </View>
                </View>)
            })
            return books;
        }
        // })

        // data.map(item => {
        //     books.push(<View key={item.id} style={styles.detail}>
        //         <Image style={styles.bookcover} source={{ uri: item.cover }}></Image>
        //         <View style={styles.detailtext}>
        //             <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail', { key: key })}>{item.nameth}</Text>
        //             <Text style={styles.author}>{item.author}</Text>
        //         </View>
        //     </View>
        //     )
        // })
        // return books;
    }

    render() {
        return (
            <View style={styles.hotbar}>
                <Text style={styles.choicename}>Let's Explore <Emoji name="star2" style={{ fontSize: 20 }} /></Text>
                <View style={styles.bookpanel}>
                    {this.renderBooks()}
                </View>
            </View>
        )
    }
}

// const mapStateToProps = ({ data }) => {
//     return {
//         data
//     }
// }

//export default connect(mapStateToProps, actions)(HotBook)

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
        fontWeight: 'bold',
        color: 'black'
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center'
    }
});