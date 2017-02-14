import todo from './todo/reducers'

import { createStore, combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   todo,
// })

export default function configureStore(onComplete){
  let store = createStore(todo)
  return store
}
