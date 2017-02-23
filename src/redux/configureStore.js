import todo from './todo/reducers'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'

const loggerMiddleware = createLogger();
import {AsyncStorage} from 'react-native'
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
  var store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(
        loggerMiddleware,
        client.middleware(),
      ),
      autoRehydrate()
    )
  )
  persistStore(store, {storage: AsyncStorage})
  return store
}
