/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { FormLabel, FormInput,Button } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {connect} from 'react-redux'
import {deleteTask as deleteTaskRedux} from './redux/todo/actions'

class TaskDetailScreen extends Component {
  constructor(props){
    super(props)
    this.state={
        newTodo:this.props.data.name,
        status:[
          this.props.data.status==="done",
          this.props.data.status!=="done"
        ]
    }
  }
  _onChangeText=(newTodo)=>{
    this.setState({
      newTodo
    })
  }
  _onPressCheckBox=(index)=>{
    if(index==0){
      this.setState({
        status:[true,false]
      })
    }else{
      this.setState({
        status:[false,true]
      })
    }
  }
  _handlingUpdateButton=()=>{
    const {_id,index}=this.props.data
    if(typeof(index)=='number'){

    }else{
      this.props.updateTask({
        variables:{
          _id,
          name:this.state.newTodo,
          status:this.state.status[0]==true?'done':'processing'
        }
      }).then((data)=>{
        console.log("data-update",data,_id)
        alert("Done!")
        console.log("this.props",this.props);
        this.props.refreshNavigator()
        this.props.navigator.pop()
      })
    }


  }
  _handlingDeleteButton=()=>{
    const {_id,index}=this.props.data
    console.log(">>>",index,typeof(index));
    if(typeof(index) =='string'){
      console.log("BEGIN DELETE FROM REDUX");
      this.props.dispatch(deleteTaskRedux(index))
      this.props.navigator.pop()
    }else{
      console.log("data-delete",_id)
      this.props.deleteTask({
        variables:{
            _id
        }
      }).then((data)=>{
        alert("Done!")
        this.props.refreshNavigator()
        this.props.navigator.pop()
      })
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput
          defaultValue={this.props.data.name}
          onChangeText={this._onChangeText}
          containerStyle={{marginBottom:16,marginTop:16}}/>
          <CheckBox
            title='Done'
            checked={this.state.status[0]}
            onPress={()=>this._onPressCheckBox(0)}
          />
          <CheckBox
            title='Processing'
            checked={this.state.status[1]}
            onPress={()=>this._onPressCheckBox(1)}
          />
          <Button
          raised
          buttonStyle={{marginTop:16}}
          backgroundColor={'#16af2b'}
          onPress={this._handlingUpdateButton}
          title='UPDATE ONLINE' />
          <Button
          raised
          buttonStyle={{marginTop:16}}
          backgroundColor={'#d30000'}
          onPress={this._handlingDeleteButton}
          title='DELETE' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    marginTop:30,
  },
});


const updateTask = gql`
  mutation($_id:ID,$name:String,$status:String){
    updateTask(_id:$_id,name:$name,status:$status){
      name,
      status,
    }
  }
`
const deleteTask= gql`
  mutation($_id:ID){
    deleteTask(_id:$_id){
      name,
      status
    }
  }
`

TaskDetailScreen = graphql(
    updateTask,
    {
      name:"updateTask"
    }
   )(graphql(
  deleteTask,{
    name:'deleteTask'
  }
)(TaskDetailScreen))
TaskDetailScreen = connect()(TaskDetailScreen)

export default TaskDetailScreen
