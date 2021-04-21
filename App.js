import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    Button, Alert,
    ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import GetLocation from 'react-native-get-location';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    location: {
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        marginBottom: 8,
    }
});

export default class App extends Component {

    state = {
        location: null,
        loading: false,
    }
    _sendData = () => {
        this.setState({ loading: true, location: null });
        const teste = GetLocation.getCurrentPosition({
                                   enableHighAccuracy: true,
        })
       .then(location => {
          axios({
            method: 'post',
            url: 'http://192.168.25.8:5001/infectado',
            data: {
                'dataNascimento': '2025-03-01',
                'sexo': 'M',
                'latitude': location.latitude,
                'longitude':location.longitude
            }
          })
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        });
     }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To send location, press the button:</Text>
                <View style={styles.button}>
                    <Button
                        title="Send For Api"
                        onPress={this._sendData}
                    />
                </View>
            </View>
        );
    }
}