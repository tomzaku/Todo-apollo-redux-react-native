const Mongoose = require('mongoose');

const TaskSchema = Mongoose.Schema({
  name: String,
  status: String,
});

const Task = Mongoose.model('Task', TaskSchema);

module.exports = Task;
