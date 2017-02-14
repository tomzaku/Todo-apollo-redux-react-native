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

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      newTodo:"",
      // todos:this.props.todos,
      dataSource:ds.cloneWithRows(this.props.todos),
    }
  }
  componentWillReceiveProps({todos}) {
      this.setState({
        dataSource:ds.cloneWithRows(todos)
      })
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
        <View style ={styles.body}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
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

MainScreen = connect(mapPropsToState)(MainScreen)
export default MainScreen
