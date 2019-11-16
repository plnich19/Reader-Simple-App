import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import { TextInput, Button, Snackbar } from 'react-native-paper'
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
            total: 0,
            snack: true
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
                    carts: []
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
            console.log("added")
        }).catch((error) => {
            console.log("error added", error)
        })
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
        })
    }

    deductItems(key) {
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        firebase.database().ref('user/' + uid + '/cart/' + key).update({
            amount: this.state.carts[key].amount - 1
        }).then((res) => {
            // let cartsCopy = JSON.parse(JSON.stringify(this.state.carts))
            // //make changes to ingredients
            // cartsCopy[key].amount = this.state.carts[key].amount - 1//whatever new ingredients are
            // this.setState({
            //     carts: cartsCopy
            // })
            console.log("deduct")
        }).catch((error) => {
            console.log("error deducted", error)
        })
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

    snack() {
        if (this.state.snack) {
            if (this.state.message) {
                let duration = 10000
                return (<View><Snackbar
                    duration={duration}
                    style={{ justifyContent: 'space-between', backgroundColor: '#00B461' }}
                    visible={this.state.snack}
                    onDismiss={() => this.setState({ snack: false })}
                    action={{
                        label: 'Yeah!',
                        onPress: () => {
                            this.setState({ snack: false })
                        },
                    }}
                >
                    Your purchase is successful <Emoji name="two_hearts" />
                </Snackbar>
                </View>)
            }
            else {
                return (<View>
                    <Snackbar
                        style={{ justifyContent: 'space-between', backgroundColor: '#B20000' }}
                        visible={this.state.snack}
                        onDismiss={() => this.setState({ snack: false })}
                        action={{
                            label: 'Got it',
                            onPress: () => {
                                this.setState({ snack: false })
                            },
                        }}
                    >
                        Sorry! Can't make purchase.
                    </Snackbar>
                </View>)
            }
        }

    }

    checkSubmit() {
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
                this.setState({ snack: true, message: true })
                //this.snack('added')
                console.log("added")
            }).catch((error) => {
                console.log("error added", error)
            })

        }
        else {
            // alert('YOUR PURCHASE EXCEED OUR STOCK')
            this.setState({ snack: true, message: false })
            //this.snack('404')

        }
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
                        {/* <TextInput style={{ width: 40, height: 40, marginRight: 5 }} value={this.state.carts[key].amount.toString()}></TextInput> */}
                        <Text styles={{ marginRight: 10, fontSize: 15 }}>{this.state.carts[key].amount}</Text>
                        <TouchableOpacity style={styles.adddeductbutton} onPress={() => this.addItems(
                            key)}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}> + </Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.deletebutton} onPress={() => this.deleteItems(
                                key)}>
                                <Text style={{ fontWeight: 'bold', color: 'grey' }}> x </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>)

            })
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
    }

    renderSubmitButton() {
        if (this.state.carts.length > 0) {
            return (<View styles={{ marginLeft: 25, marginRight: 25, marginTop: 25 }} >
                <Button icon="credit-card" mode="contained" onPress={() => this.snack('confirm')}>
                    CONFIRM
                </Button></View>)
        }
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
                        {this.renderSubmitButton()}
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
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    detail: {
        flexDirection: 'row',
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
        backgroundColor: '#7001FA',
        width: 25,
        height: 25,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4
    },
    deletebutton: {
        width: 10,
        height: 25,
        marginTop: -5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 4
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
        marginRight: 30,
        marginBottom: 30
    }

})