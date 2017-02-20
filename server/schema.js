var {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require( "graphql");

const typeDefinitions = `
type Task {
  name: String
  status: String
}
type RootQuery {

  tasks(name: String, status: String): Task
  allTask: [Task]
}
type RootMutation {
  postNewTask (
    name: String,
    status: String
  ): Task

}
schema {
  query: RootQuery
  mutation: RootMutation
}

`;

module.exports = typeDefinitions;
