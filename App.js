import React from 'react';
import { TextInput, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

export default class App extends React.Component {
  state = {text: ""};
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }

  componentDidMount = () => {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }
    if(this.state.isLoggedIn) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  }

  onLogin = () => {
    this.setState({isLoggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
