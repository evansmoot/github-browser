'use strict';
import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class Profile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return(
            <View style={styles.container}> 
                <Text>profile info goes here</Text>

                <TouchableHighlight
                    onPress={console.log("currently broken")}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Logout
                    </Text>
                </TouchableHighlight>
                    
            </View>
        );
    }

    logout() {
        console.log("in logout");
        var authService = require('./AuthService');
        authService.logout.bind(this);
        this.setState({
            isLoggedIn: false
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 65,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 9
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center'
    },
})

module.exports = Profile;