function addNewTaskQueue(newTask){
  return{
    type: 'ADD_QUEUE_TODO',
    newTask
  }
}

export {addNewTaskQueue}
