function addNewTask(task){
  return{
    type:'ADD_NEW_TASK',
    task
  }
}
function deleteTask(index){
  console.log("DELETE FROM REDUX");
  return{
    type:'DELETE_TASK',
    index
  }
}
export {addNewTask,deleteTask}
