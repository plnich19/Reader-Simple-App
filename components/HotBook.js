import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class HotBook extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.hotbar}>
                <Text style={styles.choicename}>So Hot Right Now</Text>
                <View style={styles.bookpanel}>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title} onPress={() => this.props.navigation.navigate('BookDetail')}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                            <Text style={styles.author}>Yuval Noah Harari</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                            <Text style={styles.author}>Yuval Noah Harari</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                            <Text style={styles.author}>Yuval Noah Harari</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                            <Text style={styles.author}>Yuval Noah Harari</Text>
                        </View>
                    </View>
                </View>
            </View>
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    author: {
        fontSize: 15,
        textAlign: 'center'
    }
});