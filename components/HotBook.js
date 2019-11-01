import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class HotBook extends Component {
    render() {
        return (
            <View style={styles.hotbar}>
                <Text style={styles.choicename}>So Hot Right Now</Text>
                <View style={styles.bookpanel}>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Image style={styles.bookcover} source={require('../assets/src/book1.jpg')}></Image>
                        <View style={styles.detailtext}>
                            <Text style={styles.title}>โฮโมดีอุส: ประวัติย่อของวันพรุ่งนี้</Text>
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
        marginLeft: 20
    },
    detail: {
        marginRight: 25,
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
    }
});