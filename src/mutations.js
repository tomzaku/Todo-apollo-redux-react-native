import gql from 'graphql-tag';

const deleteTask= gql`
  mutation($_id:ID){
    deleteTask(_id:$_id){
      name,
      status
    }
  }
`
const getAllTask= gql`
  query{
    allTask{
      name,
      status,
      _id
    }
  }
`
const postNewTask = gql`
  mutation($name:String,$status:String){
    postNewTask(name:$name,status:$status){
      name,
      status,
    }
  }
`
export {deleteTask,getAllTask,postNewTask}
