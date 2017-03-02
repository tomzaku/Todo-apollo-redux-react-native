import todo from './todo/reducers'
import mutationQueries from './mutation-queries/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'

const loggerMiddleware = createLogger();
import {AsyncStorage} from 'react-native'
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
var client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:8000/graphql'}),

})
var client1 = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:8000/graphql'}),
  dataIdFromObject: result => {
    // console.log("DATA",result);
    if (result._id && result.__typename) {
     return result.__typename + result._id;
   }

    return  null
  }
})
const rootReducer = combineReducers({
  todo,
  apollo: client.reducer(),
  mutationQueries,
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
  persistStore(store, {storage: AsyncStorage,blacklist:[]})
  return store
}
export {client1}
