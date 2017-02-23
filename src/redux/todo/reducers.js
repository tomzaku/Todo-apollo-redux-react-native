const initialState=[
  "Study English",
  "Play dota",
]

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case 'ADD_NEW_TASK':
      return [
        ...state,
        action.task
      ]
    case 'DELETE_TASK':
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index+1)
      ]
    default:
      return state
  }
}

export default reducer
