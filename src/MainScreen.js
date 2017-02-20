/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';
import { FormLabel, FormInput,Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {addNewTask} from './redux/todo/actions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import TaskCard from './components/TaskCard'

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      newTodo:"",
      // todos:this.props.todos,
      dataSource:ds.cloneWithRows(this.props.todos),
      dataSourceOnline:ds.cloneWithRows([{name:"Downloading..."}]),
    }
  }
  componentWillReceiveProps({todos,getAllTask}) {
      this.setState({
        dataSource:ds.cloneWithRows(todos),
        dataSourceOnline:ds.cloneWithRows(getAllTask.allTask),
      })
      console.log("Change Props",getAllTask);

  }
  _onChangeText=(newTodo)=>{
    this.setState({
      newTodo
    })
  }
  _handlingButton=()=>{
    this.props.dispatch(addNewTask(this.state.newTodo))
  }
  _renderRow=(rowData)=>(
    <TaskCard name={rowData} />
  )
  _renderRowOnline=({name,status})=>{
    return(
        <TaskCard name={name} status={status} />

    )

  }
  _handlingButtonOnline=()=>{
    console.log("Begin press button");
    this.props.postNewTask({variables:{
      name:this.state.newTodo,
      status:"processing"
    }}).then((data)=>{
      console.log("data post: ",data);
    })
  }
  render() {
    console.log(">>>>Todo",this.props);
    return (
      <View style={styles.container}>
          <FormLabel>New Todo</FormLabel>
          <FormInput onChangeText={this._onChangeText}/>
          <View style={styles.buttonComponent}>
            <Button
            raised
            buttonStyle={{marginTop:16}}
            backgroundColor={'#397af9'}
            onPress={this._handlingButton}
            title='SUBMIT OFFLINE' />
            <Button
            raised
            buttonStyle={{marginTop:16}}
            backgroundColor={'#16af2b'}
            onPress={this._handlingButtonOnline}
            title='SUBMIT ONLINE' />
          </View>

        <View style ={styles.body}>
            <Text>OFFLINE</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              />
        </View>
        <View style ={styles.body}>
            <Text>ONLINE</Text>
            <ListView
              dataSource={this.state.dataSourceOnline}
              renderRow={this._renderRowOnline}
              />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:16,
  },
  buttonComponent:{
  },
  body:{
    margin: 16,

  }
});
const mapPropsToState=(props)=>{
  return{
    todos:props.todo
  }
}

const postNewTask = gql`
  mutation($name:String,$status:String){
    postNewTask(name:$name,status:$status){
      name,
      status,
    }
  }
`
const getAllTask= gql`
  query{
    allTask{
      name,
      status
    }
  }
`

MainScreen = graphql(
    getAllTask,
    {
      name:"getAllTask"
    }
   )(graphql(
  postNewTask,{
    name:'postNewTask'
  }
)(MainScreen))
MainScreen = connect(mapPropsToState)(MainScreen)

export default MainScreen
