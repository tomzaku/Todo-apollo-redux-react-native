const Mongoose = require('mongoose');

const TaskSchema = Mongoose.Schema({
  name: String,
  status: String,
});

const Task = Mongoose.model('Task1', TaskSchema);

module.exports = Task;
