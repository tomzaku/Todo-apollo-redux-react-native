const Task = require('./model');

const createData=()=>{
    const firstTask = new Task({
      name: "Buy disk",
      status: "done"
    })
    firstTask.save((err, item) => {
        console.log('saved:', item);
      });
    const secondTask = new Task({
      name: "Hangout girlfriend",
      status: "done"
    })
    secondTask.save((err, item) => {
        console.log('saved:', item);
      });
}
module.exports = createData;
