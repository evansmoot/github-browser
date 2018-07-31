'use strict';
import React from 'react';

import {
    Text,
    View,
    ListView,
    ActivityIndicator,
    Linking,
    Image,
    StyleSheet,
} from 'react-native';

import moment from 'moment';

class IssuesList extends React.Component{
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true
        };
    }

    componentDidMount() {
        this.getIssues();
    }

    getIssues() {
        var url = 'https://api.github.com/repos/' + this.props.full_name + '/issues';
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var noResults = responseData.total_count == 0 ? true : false;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    noResults: noResults
                });

            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    issuerImage(rowData) {
        if (rowData.user == null) {
            return (
                <Image source={require('MyApp/img/Octocat.png')}
                            style={styles.issuerIcon}></Image>
            );
        }
        return (
            <Image source={{uri: rowData.user.avatar_url}}
                        style={styles.issuerIcon}></Image>
        );
    }

    issueOrPR(rowData) {
        if (rowData.pull_request == null) {
            return(
                
                <Text>
                        n{' '}
                        <Text style={{color:'blue', paddingHorizontal: 10}}
                            onPress={() => Liking.openURL(rowData.html_url)}>
                            issue
                        </Text>
                        {' '} 
                </Text> 
            );
        }
        return(
            <Text style={{color:'blue', paddingHorizontal: 10}}
                    onPress={() => Liking.openURL(rowData.html_url)}>
                    {' '}pull request{' '} 
            </Text> 
        );
    }

    renderRow(rowData) {
        return (
            <View style={{
                borderColor: '#f2f2f2',
                borderBottomWidth: 1,
                padding: 5,
                backgroundColor: '#f7f7f7',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                {this.issuerImage(rowData)}
                <View style={{
                    flexDirection: 'column',
                    paddingRight: 5,
                    flex: 1
                }}>
                    <Text numberOfLines={1}>
                        <Text style={{color:'blue', paddingHorizontal: 10}}
                            onPress={() => Linking.openURL(rowData.user.html_url)}>
                                {rowData.user.login}
                        </Text>
                            {' '}opened a
                            {this.issueOrPR(rowData)}
                        {moment(rowData.created_at).fromNow()}
                    </Text>
                    <Text numberOfLines={1}>
                        {' ' + rowData.title}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'stretch',
                }}>
                    <ActivityIndicator
                        size="large"
                        animating={true} />
                </View>
            );
        }
        if (this.state.noResults) {
            return(
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: '#c3c3c3'}}>
                        No commits found
                    </Text>
                </View>
            );
        }
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignSelf: 'stretch',
                marginTop: 5,
                marginBottom: 48,
                borderColor: '#f2f2f2' ,
                backgroundColor: '#f7f7f7',
                borderTopColor:"gray",
                borderTopWidth: 1
            }}>
                <ListView
                    scrollRenderAheadDistance={10000}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    issuerIcon: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    }
});

module.exports = IssuesList;