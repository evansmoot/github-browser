'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

var SearchResults = require('./SearchResults')

class Search extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            textInput: {
                    height: 30,
                    alignSelf: 'stretch',
                    marginTop: 10,
                    padding: 4,
                    fontSize: 18,
                    borderWidth: 2,
                    borderRadius: 9,
                    borderColor: '#F5F5F5'}
        }
    }

    focusSearchBar() {
        this.setState({
            textInput: {
                        height: 30,
                        alignSelf: 'stretch',
                        marginTop: 10,
                        padding: 4,
                        fontSize: 18,
                        borderWidth: 2,
                        borderRadius: 9,
                        borderColor: '#ccc'}
        })
    }

    unfocusSearchBar() {
        this.setState({
            textInput: {
                        height: 30,
                        alignSelf: 'stretch',
                        marginTop: 10,
                        padding: 4,
                        fontSize: 18,
                        borderWidth: 2,
                        borderRadius: 9,
                        borderColor: '#F5F5F5'}
        })
    }

    render() {
       return(
           <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TextInput 
                        onChangeText={(text) => this.setState({searchQuery: text})}
                        onSubmitEditing={this.onSearchPressed.bind(this)}
                        onFocus={() => this.focusSearchBar()}
                        onEndEditing={() => this.unfocusSearchBar()}
                        style={this.state.textInput}
                        placeholder="Search"
                        textAlign='center'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically={true}
                    />
                    <TouchableHighlight>
                        <Text style={{
                            color: '#0076ff',
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                            onPress={() => Alert.alert("Coming soon!")}>
                            Advanced Search >
                        </Text>
                    </TouchableHighlight>
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onSearchPressed() {
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 65,
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
        height: 30,
        alignSelf: 'stretch',
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 9,
        borderColor: '#F5F5F5'
    },
});

module.exports = Search;