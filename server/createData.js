const Task = require('./model');

const createData=()=>{
    const firstTask = new Task({
      name: "Study Image Proccessing",
      status: "done"
    })
    firstTask.save((err, item) => {
        console.log('saved:', item);
      });
    const secondTask = new Task({
      name: "Study Image Proccessing2",
      status: "done"
    })
    secondTask.save((err, item) => {
        console.log('saved:', item);
      });
}
module.exports = createData;
