const TaskModel = require('./model');

class Tasks {
  constructor() {
    this.findTask = (name) => {
      const person = TaskModel.findOne({ name }, (error, data) => {
        return data;
      });
      return person;
    };
    
  }
}

module.exports = { Tasks };
