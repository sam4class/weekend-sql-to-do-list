//this is where I am requiring all the files i need 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

//this is where to set up task import
let tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Ready to go on PORT', PORT);
})