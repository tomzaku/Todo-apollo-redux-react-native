/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TaskCard extends Component {
  _renderIcon=()=>{
    if (this.props.status=='done'){
      return(
        <Icon name={'done'}/>
      )
    }else{
      return(
        <Icon name={'alarm'}/>
      )
    }
  }
  render() {
    const {name,status,index}=this.props;
    console.log("TaskCard",name,status);
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <View style={styles.betweenComponent}>
          <Icon name={'delete'}/>
          <Icon name={'build'} style={{marginLeft:7,marginRight:26}}/>
          {this._renderIcon()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'black',
    borderBottomWidth:0.7,
    paddingBottom:6,
    paddingTop:6,
  },
  betweenComponent:{
    flexDirection:'row',
  }
});
