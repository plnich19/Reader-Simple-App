import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';

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
                <LinearGradient
                    colors={['#a7a4e6', '#6d6ddb', '#b3a4b3']}
                    start={[1, 0]} end={[0, 1]}
                    style={{ borderRadius: 5 }}>
                    <View style={styles.navigation}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image
                                style={styles.logo}
                                source={require("../assets/src/booklogo2.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.toggle()}>
                            <Image style={styles.menu}
                                source={require("../assets/src/menu.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navigation}>
                        {this.renderTopMenu()}
                    </View>
                </LinearGradient>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    navigation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        marginTop: 0,
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