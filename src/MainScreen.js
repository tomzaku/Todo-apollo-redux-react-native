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
import {deleteTask,getAllTask,postNewTask} from './mutations'

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
  refreshNavigator=()=>{
    this.props.getAllTask.refetch()
  }
  componentWillReceiveProps(props) {
      console.log("Props",props);
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
  _renderRowOnline=({name,status,_id})=>{
    // console.log("Watch ID",_id);
    return(
     <TaskCard name={name} status={status} navigator={this.props.navigator} _id={_id} refreshNavigator={this.refreshNavigator} onPressLeftButton={this.props.deleteTask}/>
    )
    // return(
    //   <View>
    //
    //   </View>
    // )
  }
  _handlingButtonOnline=()=>{
    console.log("Begin press button");
    this.props.postNewTask({
      variables:{
        name:this.state.newTodo,
        status:"processing"
      },
      optimisticResponse:{
        __typename: 'Mutation',
        postNewTask:{
          __typename:'Task',
          _id:null,
          name:this.state.newTodo,
          status:"processing"
        }
      },
      refetchQueries:[
        {
          query:getAllTask,
        }
      ],
      updateQueries:{
        Task:(prev,{mutationResult})=>{
          console.log(">>UpDAteQUERIES--",mutationResult);
        }
      }

    }).then((data)=>{
      console.log("data post: ",data);
      // this.props.getAllTask.refetch()
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
          onPress={this._handlingButtonOnline}
        title='SYNC DATA' />
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




MainScreen = graphql(
    getAllTask,
    {
      name:"getAllTask"
    }
   )(graphql(
  postNewTask,{
    name:'postNewTask',
  }
)(graphql(
  deleteTask,{
    name:"deleteTask"
})(MainScreen)))
const withMutationsPost = graphql(postNewTask,{
  props:({ownProps,mutate})=>({
    postNewTask:({name,status})=>
      mutate({
        variables:{name,status},
        optimisticResponse:{
          __typename: 'Mutation',
          postNewTask:{
            __typename:'Task',
            _id:null,
            name:this.state.newTodo,
            status:"processing"
          }
        },
      })
  })
})
MainScreen = connect(mapPropsToState)(MainScreen)

export default MainScreen
