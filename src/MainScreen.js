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
    <Text>
      {rowData}
    </Text>
  )
  _renderRowOnline=({name,status})=>{
    return(
      <Text>
        {`Name: ${name}(Status: ${status})`}
      </Text>
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
          <Button
          raised
          buttonStyle={{marginTop:16}}
          backgroundColor={'#397af9'}
          onPress={this._handlingButton}
          title='SUBMIT' />
          <Button
          raised
          buttonStyle={{marginTop:16}}
          backgroundColor={'#397af9'}
          onPress={this._handlingButtonOnline}
          title='SUBMIT ONLINE' />
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
  body:{
    margin: 16,

  }
});
const mapPropsToState=(props)=>{
  return{
    todos:props
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
MainScreen = connect(mapPropsToState)(MainScreen)

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
export default MainScreen
