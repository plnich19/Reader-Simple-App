import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import { TextInput, Button, Snackbar } from 'react-native-paper'
import _ from 'lodash';
import config from '../firebase/config.js';
import Emoji from 'react-native-emoji';
import Navigation from './Navigation.js';
import fixtimerbuf from '../fixtimerbug.js';
import * as moment from 'moment';
import { black } from "ansi-colors";

export default class Order extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.state = {
            orders: []
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
                    login: false,
                });
            }
        }
        )
    }

    listenForOrderChange() {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        firebase.database().ref('books/' + uid + '/order/').on('value', (snap) => {
            const data = snap.val()
            if (data != null) {
                this.setState({
                    orders: data,
                })
            }
        })
    }

    componentDidMount() {
        this.listenForAuthChange();
        this.listenForOrderChange();
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        if (uid != null) {
            firebase.database().ref('user/' + uid + '/order/').on('value', (snap) => {
                const data = snap.val()
                if (data != null) {
                    this.setState({
                        orders: data
                    });
                }
            });
        }
    }

    renderOrders() {
        let orders = [];
        if (this.state.orders.length == 0) {
            return (<View style={{ justifyContent: 'center' }}>
                <Text style={styles.notfound}>No order to show</Text>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <Button styles={{ marginLeft: 20 }} icon="shopping" mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
                        Let's shop!
                </Button>
                </View></View>)
        }
        else {
            Object.keys(this.state.orders).map((key, index) => {
                orders.push(<View style={styles.detail}><Text style={styles.author}>Order at {this.state.orders[key].time}</Text></View>)
                Object.keys(this.state.orders[key].order).map((obj) => {
                    orders.push(<View key={key} style={{
                        marginLeft: 30, marginRight: 30, borderLeftColor: '#3B00FF',
                        borderLeftWidth: 1, borderRightColor: '#3B00FF',
                        borderRightWidth: 1, flexDirection: 'row'
                    }}>
                        <View style={{ width: 270 }}>
                            <Text style={styles.title}>{this.state.orders[key].order[obj].nameth} by {this.state.orders[key].order[obj].author}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{this.state.orders[key].order[obj].amount}</Text>
                        </View>
                    </View>)
                });

                orders.push(<View style={styles.detail2}><Text style={styles.author2}>Total: {this.state.orders[key].total}</Text></View>)
            })
            return orders;
        }
    }
    render() {
        return (
            <ScrollView>
                <Navigation />
                <View style={styles.hotbar}>
                    <Text style={styles.choicename}>Your Order <Emoji name="shopping_bags" style={{ fontSize: 20 }} /></Text>
                    <View style={styles.bookpanel}>
                        {this.renderOrders()}

                    </View>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    hotbar: {
        flex: 1,
        marginTop: 50,
    },
    choicename: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 30
    }, bookpanel: {
        flexWrap: 'wrap',
    },
    detail: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        // marginBottom: 20,
        borderTopColor: '#3B00FF',
        borderRightColor: '#3B00FF',
        borderRightWidth: 1,
        borderLeftColor: '#3B00FF',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detail2: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        borderBottomColor: '#3B00FF',
        borderRightColor: '#3B00FF',
        borderRightWidth: 1,
        borderLeftColor: '#3B00FF',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    title: {
        fontSize: 12,
        textAlign: 'left',
        color: 'black',
        paddingLeft: 10,
    },
    author: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        paddingBottom: 10,
        paddingLeft: 10
    },
    author2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#AF00FF',
        paddingBottom: 10,
        paddingLeft: 10
    },
    price: {
        fontSize: 14,
        color: '#009DFF',
    },
    total: {
        color: '#009DFF',
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 30,
        marginBottom: 30
    },
    notfound: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30
    },
})