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
    if (this.props.status=='done'){
      return(
        <Icon name={'done'}/>
      )
    }else if(this.props.status=='uploading'){
      return(
        <Icon name={'file-upload'}/>
      )
    }else{
      return(
        <Icon name={'alarm'}/>
      )
    }
  }
  render() {
    const {name,status,index,_id}=this.props;
    // console.log("TaskCard",name,status);
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <View style={styles.betweenComponent}>
          <Icon name={'delete'} onPress={()=>this.props.onPressLeftButton({
              variables:{
              _id
            },
            optimisticResponse:{
              __typename:'Mutatioin',
              deleteTaskQuerry:{
                __typename:'Task',
                _id
              }
            },
            updateQueries:{
              allTaskQuerry:(prev,{mutationResult})=>{
                console.log(">>>DELETE TASK",prev,mutationResult);
                const result ={...prev,
                allTask:prev.allTask.slice(0,prev.allTask.length-1)}
                console.log("RESULT",result);
                return result
              }
            },
            refetchQueries:[
              {
                query:getAllTask,
              }
            ],
            })}/>
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
