import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

export const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    BookDetail: BookDetail,
    Login: Login,
    Find: Find
},
    {
        initialRouteName: 'Home',
    }
);

class Navigator extends Component {
    render() {
        return (
            <Navigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigation,
            })} />
        )
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation,
})

export default connect(mapStateToProps)(Nav)