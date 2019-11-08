import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { SearchBar } from 'react-native-elements';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        search: '',
    };
    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (<View style={styles.menupanel}>
            <SearchBar
                keyboardType='default'
                containerStyle={{ backgroundColor: 'black' }}
                placeholder="Search Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
            <TouchableHighlight style={styles.loginbutton}>
                <Text style={styles.loginbuttontext}>Search</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.loginbutton} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginbuttontext}>Log in/Sign up</Text>
            </TouchableHighlight>
        </View>);
    }
}

const styles = StyleSheet.create({
    menupanel: {
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
        backgroundColor: 'black'
    },
    loginbutton: {
        flex: 1,
        backgroundColor: 'black'
    },
    loginbuttontext: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        justifyContent: 'center',
        width: '100%'
    }
});