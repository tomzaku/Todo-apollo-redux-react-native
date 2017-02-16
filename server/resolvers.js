const resolveFunctions = {
  RootQuery: {
    tasks(_, { name }, ctx) {
      const task = new ctx.constructor.Tasks();
      return task.findTask(name);
    },
  },
  RootMutation:{
    postNewTask(_,{name,status},ctx){
      
    }
  }
};

module.exports = resolveFunctions;
