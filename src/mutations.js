import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
            _id:"@1321321321sdas"
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
    options: { pollInterval: 2000 },
  })
const withMutationsDelete = graphql(
    deleteTask,{
      props:({ownProps,mutate})=>({
        deleteTask:({_id})=>
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
          })
      })
    }
)
const withMutationUpdate = graphql(
    updateTask,
    {
      props:({ownProps,mutate})=>({
        updateTask:({_id,name,_status})=>
          mutate({
            variables:{_id,name,_status},
            optimisticResponse:{
              __typename:"Mutatioin",
              updateTaskQuerry:{
                __typename:"Task",
                _id,
                name,
                _status
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
