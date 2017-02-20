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
    default:
      return state
  }
}

export default reducer
