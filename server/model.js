const Mongoose = require('mongoose');

const TaskSchema = Mongoose.Schema({
  name: {
    type:String,
    required:true,
    index:true,
    unique:true,
  },
  status: {
    type:String,
    required:false,
    unique:false
  }
});

const Task = Mongoose.model('Task1', TaskSchema);

module.exports = Task;
