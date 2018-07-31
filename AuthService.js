'use strict';
require('node-libs-react-native/globals');
var AsyncStorage  = require('react-native').AsyncStorage;
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                return cb(err);
            }

            if (!val) {
                return cb();
            }

            if (!val[0][0]) {
                return cb();
            }

            var authInfo = {
                header : {
                    Authorization: 'Basic ' + val[0][0]
                },
                user: val[1][0]
            }

            return cb(null, authInfo);
        });
    }

    login(creds, cb) {
        var b = new Buffer(creds.username + ':' + creds.password);
        var encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                return response;
            }
            if (response == 401) {
                throw 'bad credentials';
            }
            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((results) => {
            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [userKey, JSON.stringify(results)]
            ], (err) => {
                if (err) {
                    throw err;
                }
                return cb({success: true})
            })
        })
        .catch((err) => {
            return cb(err);
        });
    }

    logout() {
        AsyncStorage.clear();
        this.setState({isLoggedIn: false});
    }
}

module.exports = new AuthService();