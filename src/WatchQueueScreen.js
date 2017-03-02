/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';
import {connect} from 'react-redux'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class WatchQueueScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      dataSource:ds.cloneWithRows(this.props.mutationQueries.todo)
    }
  }
  render() {
    console.log("QUEUE",this.props.mutationQueries);
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data)=>(
            <View>
              <Text>
                {`${data.name}---${data.status}`}
              </Text>
            </View>
          )}
          enableEmptySections ={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    backgroundColor:'white',
  },
});

const mapPropsToState=(state)=>{
  return{
    mutationQueries: state.mutationQueries
  }
}
WatchQueueScreen =connect(mapPropsToState)(WatchQueueScreen)
export default WatchQueueScreen
