const typeDefinitions = `
type Tasks {
  name: String
  status: String
}
type RootQuery {
  tasks(name: String, status: String): Tasks
}
# this schema allows the following mutation
type RootMutation{
  postNewTask(
    name: String,
    status: String
  ): Tasks
}
schema {
  query: RootQuery
  mutation: RootMutation
}

`;

module.exports = [typeDefinitions];
