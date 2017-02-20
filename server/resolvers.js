const resolveFunctions = {
  RootQuery: {
    tasks(_, { name }, ctx) {
      console.log("_",_);
      console.log("name",name);
      const task = new ctx.constructor.Tasks();
      return task.findTask(name).then((data)=> console.log("DATA-GET",data));
    },
    allTask(_,data,ctx){
      console.log("ss",ctx,_)
      const tasks = new ctx.constructor.Tasks();
      // console.log(">>>result ",tasks.allTask());
      var allData = tasks.allTask()
      console.log("data: ",allData);
      return allData
    },

  },
  RootMutation: {
     postNewTask(_,data,ctx){
        // console.log(">>>Name ",name);
        // console.log(">>>Status ",status);
        // console.log("datta:",data);
        const task = new ctx.constructor.Tasks();
        return task.addNewTask(data.name,data.status);
      },
      updateTask(_,{_id,name,status},ctx){
        const tasks = new ctx.constructor.Tasks();
        return tasks.updateTask(_id,name,status)
      },
      deleteTask(_,{_id},ctx){
        const tasks = new ctx.constructor.Tasks();
        return tasks.deleteTask(_id)
      }
  }
};

module.exports = resolveFunctions;
