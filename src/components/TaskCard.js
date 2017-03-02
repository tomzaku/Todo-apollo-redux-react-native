/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteTask,getAllTask,postNewTask} from '../mutations'

export default class TaskCard extends Component {
  _renderIcon=()=>{
    switch (this.props.status){
      case 'done' : return <Icon name={'done'}/>
      case 'uploading' : return  <Icon name={'file-upload'}/>
      case 'error': return   <Icon name={'error-outline'} color={'red'}/>
      case 'processing': <Icon name={'alarm'}/>
      default: return <Icon name={'alarm'}/>
    }

    // if (this.props.status=='done'){
    //   return(
    //     <Icon name={'done'}/>
    //   )
    // }else if(this.props.status=='uploading'){
    //   return(
    //     <Icon name={'file-upload'}/>
    //   )
    // }else{
    //   return(
    //     <Icon name={'alarm'}/>
    //   )
    // }
  }
  render() {
    const {name,status,index,_id}=this.props;
    // console.log("TaskCard",name,status);
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <View style={styles.betweenComponent}>
          <Icon name={'delete'} onPress={()=>this.props.onPressLeftButton({_id,index: parseInt(index)})}/>
          <Icon
            name={'build'}
            style={{marginLeft:7,marginRight:26}}
            onPress={()=>this.props.navigator.push({routeName:'task-detail',data:{name,status,_id,index},refreshNavigator:this.props.refreshNavigator})}/>
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
