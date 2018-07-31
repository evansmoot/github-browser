'use strict';
import React from 'react';


import {
    Text,
    View,
    ListView,
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

var starIcon = "data:image/png;base64,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"
var forkIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAITElEQVR42u2dX4hVRRzHP26yLXJZFpPFZJHNlgiRUJEoWYTEDKwHsagQCysCKQmpKDEJIkKiQETCejARERGql0VKxERMzETKzESlNjEz3dRkU3fdXe3h58Iqd+acM3fOnTn3/j4wL/feM/c3M98z/+c3oCiKoiiKoiiKoiiKoiiKotQ4d4Q2ICMloA24G7gT6AOGQhul5EcDMAtYBxwF+oEBpNAHgF5gD7ACmBTaWMUvs4F9SGHfSBGuAhuQGkIpME3AauQNT1Pwt4ceYH7oRChulIAu3Ap+ZBgAXgmdGCUbo4HNVF74I0XwbOhEKelZSvr2Pm24BNwfOmExMyq0ATdpA44AzZbfnAO+APYD/wITgUeBuUi/wcQ3wOPA9dCJVMyswfwWDwGfAC2GZ6cgorA9Pyt0AhUzJeA85gJckTKO3ZY4tlQ5TQ1I07MA6YwuAxYBM7DXVnXJPMwFtw3JzDRMBC4a4ulBRJI3k4G1wGns/ZLNQGcV7CkEqzBX3Q9ljOsjzBk/Pcc0jAc2kW3uYggReN3PYH5J+Qw6iQwNs9CJOcOfzsn+Odjf+KRwkTqfuNpJ+YzZ7RDXBMwZvSQH2+cDl3Ev/OHQD7yYd0aXI237miem4Vmj5/QMera7E6n2x3iIqxEZ6cz1bGMiMQjgnOHzSWTP3CmW7/7yaHMLsvCUpmN57WZIoglYD7R6tDORGARwxPB5K9K+ZuEZw+eDwHGPNr8BdFi+vwJ8CjwC3AvcAzwMfAxcsDzXBrzj0c5CMBNz2/gj6WuBGciScLl4juHWpJSjBfu8xWFkOGiiHdhref4S0pepG0YD3ZYM2Uxy4bUDJyxxrPJo7yLL//yGDAmTaEHEbYpnWW65HSnLsPeSd1G+fW9EVvzOWJ69jN+x9ibD/wwhk1ppmY558WtHvtkdH2OQLV9JEyd7kc0i7yOdsO6EZ24gk0M+Mdl5iOx9qh2GuM5Sh1PGnZjbcNdwGP9TwL2G/1rtENdyQ1xXqVI/IIZRwDDfAa/ib7x+DhkV/OfRxmbM/ZFTjjaWowk/8wuJxCQAgM+Bl5FhVCX8DTwG/OrZvj7ME1d3OcRnKuS0cwc1y1zMVW1SOEO+u4BOGv53p0Ncpg7leeybY+qClbgJIK9Fn2FMm1b7ySa8VmTMb5r/qHsmk73wz+NvwsfEUsv/byfdCmYDsNESz4fVyeK4aSW7AI5Wwa427CuA67EP4Rox74G4gewpmFq1XI6YWAUA8FmCHQeQSaGRnbwmZG1jd8KzXcTXOQ9CzAJoQ7aZJdlzFtmwug/7bOVw6MW+ollXxCwAkM6m6/E1U9DTTCOIXQAgM3m+DrN8gFb9t1AEAQC8TmU1wQCyGKaFfxsuAgg1fl6Ce02wOJDN0eMigH2BbG0guXdfLrhsfPVuuFI514GfHZ7bFtpwFYA/XObu/wxttArAHy0Oz1xweMYrKgB/uPgm+ie00SoAP5SQw6lZGET2LQRFBeCHdmBcxmf68HtYxYmYBZD3sq5PXI50HScCryUxC6Aqe+I80AA86fDcT6ENHzZeqYypwIMOz4WatLoFFUDlvE12PwaDyC7o4KgAKmMO4gcoK7/j97CqMyoAd1qRnUFZ336Ar4igAwgqAFdKyKFVlzOHg8DW0AkoAvcR52rgWOBrB9uGw57QGVsUYhTAVMShhWvhD1HnDqGyEJMAWpAtW5UeXj2AW5+hLolBAG3IUfQ0O3rTvP1VdwJVZEIJYDRSTXchx7187fjdgna6M1FtATyAOJPw8bbfHk5RZe9faan39mgCsr//OaSDl8cbeg14AbMvAMVAXjVAM+JXaBv+PZKUa/dfC52RRcWnAJqQDthG7C7efIdVaLvvjIsA9o94fjSySrcas1OHPN98LfwKcRFAN+LBczniIMr3HURpQj960scLLgIYwu/QLWs4SzZfgYoFFwGECsOXP2TdGKpYKIoATiPn+7TK90zsAriETBO7HAhRUhCrAM4A7xLpzF4tEZMAhpCTvAupQx++obDd/1Ot0I24bJuMtvFVx8U/gI/Qg3gin0OxDqfUHNUUwEVkn94C1EVrNOQtgMvI2H0hss9PiYw8BDCArBcsxe04t1JFfAqgF3HhOgPtzBUGHwLoB9ahU7SFpFIBHEPeeKWgVCKAE+hMXeFxFYC6W68RXAWwLrThih9cBDCEvv01g4sATqPDvEzUWmZF4XipSMQsAJeFGC38jMQsAJe2vAM97VQTjEEcKbiMAt4MbbxSGWMxX86YdiTwHnHXboqB8cBB/CwArUVFUCiaEQ8aPpd/3wqdKCU9G8i2ypf2dzNDJ0xJZjb2c3wDiIeNOUhN0YhsGl1McpNxAN3bFz27MBdgD3bfOo2IAyebgFy8eSpVogPzvXtXgc4UcTQg27dNAtgeOpGKmSWYCy7LNepNmH349ZL9Qoe6IIZh0jTD532IL9602H5fQg53KLcRgwAmGD7/A/GqnYVvLd+5+PWteWIQgOlmEJc79Wy3cOmBjzLEIADT3XkubXbJ8l1f6ITGSAwCML3pHWTf2GkbMQS/oStGYhCA6cbvEnJsK0taXjJ8Nwj8EjqhSnnaMU/inEdqgjTYhpOH0H0CUWNb+z+KOIuw8Tx2r5/LQydQsfMU9qnci4hblvYRzzQijiC3Yp5JHK5FxodOoGKngXQ7gPoRr5+HEZ98aRxB6g6hgjAZ/358d6ArgYXiCcRxg4/CP4ieDywk85Al4EoKfyda+IWmA7maLauz515gJVrt1wQNyEaQLpIvdugB1nDrKEFJwajQBqRkHDLNOw3x9lFC1hC6gR+A74EroY1UFEVRFEVRFEVRFEVRFEVRlAj5H6cMwLzS2UuqAAAAAElFTkSuQmCC"
var issueIcon = "data:image/png;base64,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"

var RepositoryDetail = require('./RepositoryDetail')

class SearchResults extends React.Component{
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true,
            searchQuery: props.searchQuery
        };
    }

    componentDidMount() {
        this.doSearch();
    }

    doSearch() {
        var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var noResults = responseData.total_count == 0 ? true : false;
                this.setState({
                    repositories: responseData.respositories,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items),
                    noResults: noResults
                });

            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: 'Repository Detail',
            component: RepositoryDetail,
            passProps: {
                pushEvent: rowData
            }
        }); 
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    borderColor: '#d7d7d7',
                    borderBottomWidth: 1,
                    padding: 5,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '500'
                    }} numberOfLines={1}>
                        {rowData.full_name}
                    </Text>
                    
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                        marginBottom: 5,
                    }}>
                        <View style={styles.repoCellDescription} >
                            <Text style={styles.repoCellLabel} numberOfLines={2}>
                                {rowData.description}
                            </Text>
                        </View>
                        <View style={styles.repoCell} >
                            <Image source={{uri: starIcon}}
                                style={styles.repoCellIcon}></Image>
                            <Text style={styles.repoCellLabel}>
                                {rowData.stargazers_count}
                            </Text>
                        </View>
                        <View style={styles.repoCell} >
                            <Image source={{uri: forkIcon}}
                                style={styles.repoCellIcon}></Image>
                            <Text style={styles.repoCellLabel}>
                                {rowData.forks}
                            </Text>
                        </View>
                        <View style={styles.repoCell} >
                            <Image source={{uri: issueIcon}}
                                style={styles.repoCellIcon}></Image>
                            <Text style={styles.repoCellLabel}>
                                {rowData.open_issues}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
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
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: '#c3c3c3'}}>
                        No results found
                    </Text>
                </View>
            );
        }
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignSelf: 'stretch',
                marginTop: 64,
                marginBottom: 48
            }}>
                <ListView  
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    repoCell: {
        width: 50,
        alignItems: 'center',
    },
    repoCellDescription: {
        width: 200,
        alignItems: 'flex-start'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    },
    repoCellLabel: {
        textAlign: 'center'
    }
});

module.exports = SearchResults;