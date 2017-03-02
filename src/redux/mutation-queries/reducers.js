const initialState= {
  todo:[
  ]
}
const reducer = (state=initialState,action)=>{
  switch (action.type){
    case 'ADD_QUEUE_TODO':
      return {
        ...state,
        todo:[...state.todo,action.newTask]
      }
    default:
      return state
  }
}
export default reducer
