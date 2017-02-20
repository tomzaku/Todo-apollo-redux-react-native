import todo from './todo/reducers'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:8000/graphql'})
})
const rootReducer = combineReducers({
  todo,
  apollo: client.reducer(),
})

export default function configureStore(onComplete){
  let store = createStore(
    rootReducer,
    applyMiddleware(
      loggerMiddleware,
      client.middleware()
    )
  )
  return store
}
