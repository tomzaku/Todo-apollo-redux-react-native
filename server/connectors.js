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
    this.updateTask=(_id,name,status)=>{
      const newTask= TaskModel({
        _id,
        name,
        status
      })
      return TaskModel.update(TaskModel.findOne({_id:_id}),newTask).then((tasks)=>{
          console.log("Tasks",tasks);
          return {name,status}
        }
      )
    }
    this.deleteTask=(_id)=>{
      var dataGet;
      return TaskModel.findOne({_id:_id}).then((data)=>{
        dataGet=data
      }).then(()=>TaskModel.remove(
        TaskModel.findOne({_id:_id})
      )).then((tasks)=>{
        return{
          name:dataGet.name,
          status:dataGet.status
        }
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

// db.tasks.update(db.tasks.findOne({name:"Buy S6 Plus"}),{name : "Buy S6 Edge Plus"})
