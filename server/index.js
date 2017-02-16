const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const {apolloExpress,graphqlExpress,graphiqlExpress} = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools');


Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/Todo', (err) => {
  if (err) {
    return err;
  }
  return true;
});
var createData = require('./createData');
createData()



const PORT = 3000;
var app = express();


const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');


const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});
// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {
    constructor: Connectors,
  },
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
module.exports =app
