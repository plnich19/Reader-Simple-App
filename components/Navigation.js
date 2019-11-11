import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { withNavigation } from 'react-navigation';
import Menu from "./Menu.js";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuToggle: false,
        }
    }


    renderTopMenu() {
        if (this.state.menuToggle) {
            return <Menu navigation={this.props.navigation} />;
        }
        else {
            return;
        }
    }
    toggle() {
        const currentState = this.state.menuToggle;
        this.setState({ menuToggle: !this.state.menuToggle });
    }

    render() {
        return (
            <View>
                <View style={styles.navigation}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
                        <Image
                            style={styles.logo}
                            source={require("../assets/src/readery.jpg")}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.toggle()}>
                        <Image style={styles.menu}
                            source={require("../assets/src/menu.png")} />
                    </TouchableHighlight>
                </View>
                <View style={styles.navigation}>
                    {this.renderTopMenu()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        marginTop: 5,
        marginLeft: 10,
        width: 200,
        height: 100
    },
    menu: {
        marginTop: 5,
        width: 20,
        height: 20,
        marginRight: 40
    },
});

export default withNavigation(Navigation);