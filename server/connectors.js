const TaskModel = require('./model');

class Tasks {
  constructor() {
    this.findTask = (name) => {
      return TaskModel.findOne({ name }, (error, data) => {
        return data;
      });
    };
    this.allTask=()=>{
      return TaskModel.find({}).exec((err,tasks)=>{
        return {tasks}
      })
    }
    this.addNewTask= (name,status)=>{
      const newTask = TaskModel({
        name:name,
        status:status
      })
      newTask.save((err, item) => {
          console.log('saved:', item);
      });
      return newTask
    }
  }
}

module.exports = { Tasks };
