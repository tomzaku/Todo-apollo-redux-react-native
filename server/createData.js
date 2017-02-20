const Task = require('./model');

const createData=()=>{
    const firstTask = new Task({
      name: "ahihi",
      status: "done"
    })
    firstTask.save((err, item) => {
        console.log('saved:', item);
      });
    const secondTask = new Task({
      name: "ahoho",
      status: "done"
    })
    secondTask.save((err, item) => {
        console.log('saved:', item);
      });
}
module.exports = createData;
