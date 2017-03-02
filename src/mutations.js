import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
const uuidV1 = require('uuid/v1');
const deleteTask= gql`
  mutation deleteTaskQuerry($_id:ID){
    deleteTask(_id:$_id){
      name,
      status
    }
  }
`
const getAllTask= gql`
  query allTaskQuerry{
    allTask{
      name,
      status,
      _id
    }
  }
`
const postNewTask = gql`
  mutation postNewTaskQuerry($name:String,$status:String){
    postNewTask(name:$name,status:$status){
      name,
      status,
    }
  }
`
const updateTask = gql`
  mutation updateTaskQuerry($_id:ID,$name:String,$status:String){
    updateTask(_id:$_id,name:$name,status:$status){
      name,
      status,
    }
  }
`

const withMutationsPost = graphql(postNewTask,{
  props:({ownProps,mutate})=>({
    postNewTask:({name,status})=>
      mutate({
        variables:{name,status},
        optimisticResponse:{
          __typename: 'Mutation',
          postNewTask:{
            __typename:'Task',
            name,
            status:"uploading",
            _id:uuidV1()
          }
        },
        refetchQueries:[
          {
            query:getAllTask,
          }
        ],
        updateQueries:{
          allTaskQuerry:(prev,{mutationResult})=>{
            console.log("UPDATE QUERIES",mutationResult,prev);
            var newTask= mutationResult.data.postNewTask;
            // return update(prev,{
            //   allTask:{
            //     ...newTask
            //   }
            // })
            newTask.status="uploading"
            if(prev.allTask==null){
              prev = {
                allTask:[]
              }
            }
            const result ={...prev,
            allTask:[...prev.allTask,newTask]}
            return  result
          }
        }

      })
  })
})
const withMutationsPostGet= graphql(getAllTask,
  {
    name:"getAllTask",
    // options: { pollInterval: 2000 },

  })
const withMutationsDelete = graphql(
    deleteTask,{
      props:({ownProps,mutate})=>({
        deleteTask:({_id,index})=>
          mutate({
            variables:{_id},
            optimisticResponse:{
              __typename:'Mutatioin',
              deleteTaskQuerry:{
                __typename:'Task',
                _id
              }
            },
            updateQueries:{
              allTaskQuerry:(prev,{mutationResult})=>{
                console.log(">>>DELETE TASK",prev,mutationResult,ownProps);
                const result ={...prev,
                  allTask:[...prev.allTask.slice(0,index),...prev.allTask.slice(index+1,prev.allTask.length)]
                }
                return result
              }
            },
            reducer : (data)=>{
              console.log("DATA REDUCER from mutation",data);
            },
            refetchQueries:[
              {
                query:getAllTask,
              }
            ],
          })
      })
    }
)
const withMutationUpdate = graphql(
    updateTask,
    {
      props:({ownProps,mutate})=>({
        updateTask:({_id,name,status})=>
          mutate({
            variables:{_id,name,status},
            optimisticResponse:{
              __typename:"Mutatioin",
              updateTaskQuerry:{
                __typename:"Task",
                _id,
                name,
                status
              }
            },
            refetchQueries:[
              {
                query:getAllTask
              }
            ]
          })
      })
    }
   )
export {deleteTask,getAllTask,postNewTask,withMutationsPost,withMutationsPostGet,withMutationsDelete,withMutationUpdate}
