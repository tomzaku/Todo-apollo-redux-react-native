const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const {apolloExpress,graphqlExpress,graphiqlExpress,graphqlConnect} = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools');

const GraphQLJSON = require('graphql-type-json');

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/Todo', (err) => {
  if (err) {
    return err;
  }
  return true;
});
var createData = require('./createData');
createData()



const PORT = 8000;
var app = express();


const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

// const resolveFunctions = {
//   JSON: GraphQLJSON
// };

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});
// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  graphiql: true,
  pretty: true,
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
