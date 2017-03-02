/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  NetInfo
} from 'react-native';
import { FormLabel, FormInput,Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {addNewTask} from './redux/todo/actions'
import {addNewTaskQueue} from './redux/mutation-queries/actions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import TaskCard from './components/TaskCard'
import update from 'immutability-helper';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {withMutationsPost,withMutationsPostGet,withMutationsDelete} from './mutations'

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
  componentWillMount(){
    // this.props.actions.checkConnection();
    NetInfo.isConnected.addEventListener('change',isConnected=>{
      if(isConnected){
        alert("Online!")
      }else{
        alert("Offline!")
      }
    })
}
  componentWillReceiveProps(props) {
      console.log("PropsWillReceive",props);
      const {todos,getAllTask} =props
      if(todos){
        this.setState({
          dataSource:ds.cloneWithRows(todos),
        })
      }
      if(getAllTask.allTask){
        this.setState({
          dataSourceOnline:ds.cloneWithRows(getAllTask.allTask),
        })
      }
      // if(getAllTask.error){
      //   alert(getAllTask.error)
      // }
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
  _renderRow=(rowData,undefind,index)=>(
    <TaskCard name={rowData} navigator={this.props.navigator} index={index} />
  )
  _renderRowOnline=({name,status,_id},undefind,index)=>{
    return(
     <TaskCard name={name} status={status} navigator={this.props.navigator} index={index} _id={_id} onPressLeftButton={this.props.deleteTask}/>
    )
  }
  _handlingButtonOnline=()=>{
    console.log("Begin press button");
    var newTask ={
      name:this.state.newTodo,
      status:"processing"
    }
    this.props.postNewTask(newTask).then((data)=>{
      console.log("data post: ",data);
      // this.props.getAllTask.refetch()
    }).catch(err=>{
      // console.log("ERR",err)
      // alert(err)
      // this.props.dispatch(addNewTaskQueue(newTask))
      newTask.status = "error"

      this.setState({
        // dataSourceOnline:ds.cloneWithRows(this.props.mutationTodoQueries.map((data)=>{data.status= "error";return data}))
        // dataSourceOnline:ds.cloneWithRows([...this.state.dataSourceOnline._dataBlob.s1,newTask])
      })

    })
    // newData= this.props.getAllTask.allTask
    // newData.push({
    //     name:"bat chap",
    //     status:"done"
    //   }
    // )
    // console.log("NEwDAta",newData);


    // this.setState({
    //   dataSourceOnline:ds.cloneWithRows([...this.props.getAllTask.allTask,{
    //       name:this.state.newTodo,
    //       status:"uploading"
    //     }])
    // })
  }
  render() {
    console.log(">>>>PROPS",this.props);
    // console.log(">>>>STAte",this.state.dataSourceOnline._dataBlob.s1);
    return (
      <View style={styles.container}>
          <FormLabel>New Todo</FormLabel>
          <FormInput onChangeText={this._onChangeText}/>
          <View style={styles.buttonComponent}>
            {/* <Button
            raised
            buttonStyle={{marginTop:16}}
            backgroundColor={'#397af9'}
            onPress={this._handlingButton}
            title='SUBMIT OFFLINE' /> */}
            <Button
            raised
            buttonStyle={{marginTop:16}}
            backgroundColor={'#16af2b'}
            onPress={this._handlingButtonOnline}
            title='SUBMIT' />
          </View>

        {/* <View style ={styles.body}>
            <Text>OFFLINE</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              />
        </View> */}
        <View style ={{flex:1,margin:16}}>
            <Text>ONLINE</Text>
            <ListView
              dataSource={this.state.dataSourceOnline}
              renderRow={this._renderRowOnline}
              />
        </View>
        <Button
          raised
          buttonStyle={{marginTop:16,marginBottom:16}}
          backgroundColor={'#09b7c6'}
          onPress={()=>this.props.navigator.push({routeName:"watch-queue"})}
        title='WATCH QUERIES' />
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
    todos:props.todo,
    mutationTodoQueries:props.mutationQueries.todo,
    apollo:props.apollo
  }
}

MainScreen = withMutationsPostGet(withMutationsPost(withMutationsDelete(MainScreen)))

MainScreen = connect(mapPropsToState)(MainScreen)

export default MainScreen
