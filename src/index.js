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


import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:8000/graphql'})
})


export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      store: configureStore()
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store = {this.state.store} style={styles.container}>
            <MainScreen/>
        </Provider>
    </ApolloProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
});
