const initialState=[
  "Hoc tieng anh",
  "Choi dota",
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
