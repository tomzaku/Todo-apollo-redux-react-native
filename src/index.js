/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MainScreen from './MainScreen'
import configureStore from './redux/configureStore'
import {Provider} from 'react-redux';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      store: configureStore()
    }
  }
  render() {
    return (
      <Provider store = {this.state.store} style={styles.container}>
        <MainScreen/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
});
