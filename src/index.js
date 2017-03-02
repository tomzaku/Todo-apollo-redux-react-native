/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';
import MainScreen from './MainScreen'
import TaskDetailScreen from './TaskDetailScreen'
import WatchQueueScreen from './WatchQueueScreen'
import configureStore,{client1} from './redux/configureStore'
import {Provider} from 'react-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({ uri: 'http://localhost:8000/graphql'}),
//   dataIdFromObject: result => {
//     // console.log("DATA",result);
//     if (result._id && result.__typename) {
//      return result.__typename + result._id;
//    }
//     return  null
//   }
// })
console.log("Client",client1);
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      store: configureStore()
    }
  }
  _renderScene=(route,navigator)=>{
    switch(route.routeName){
      case 'task-detail':
        return <TaskDetailScreen {...route} navigator={navigator} data={route.data} />
      case 'watch-queue':
        return <WatchQueueScreen  {...route} navigator={navigator} />
      default:
        return <MainScreen {...route} navigator={navigator}/>
    }
  }
  _onDidFocus=(route)=>{
    if(route.name==='home'){
           return <MainScreen navigator={navigator}/>
       }
  }
  render() {
    return (
      <ApolloProvider client={client1} store={this.state.store} style={styles.container}>
        <Navigator
          initialRoute={{routeName:'home'}}
          onDidFocus={this._onDidFocus}
          renderScene={this._renderScene}/>
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
