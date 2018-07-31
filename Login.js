'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render() {
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination is not valid
            </Text>
        }

        if(!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                We're experiencing an unexpected issue
            </Text>
        }

        return(
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('MyApp/img/Octocat.png')} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput 
                    onChangeText={(text) => this.setState({username: text})}
                    style={styles.input}
                    placeholder="Github username"/>
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                    placeholder="Github password"/>
                <TouchableHighlight
                    onPress={this.onLoginPress.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large" 
                    style={styles.loader}/>
            </View>
        );
    }

    onLoginPress() {
        console.log('Attempting to login with username ' + this.state.username);
        this.setState({showProgress: true});

        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if(results.success && this.props.onLogin) {
                this.props.onLogin(this.state.username);
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5fcff',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
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
    load: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

module.exports = Login;