const express = require('express');
const router = express.Router();
const pg = require('pg');

//pg pool
let pool;

if(process.env.DATABASE_URL){
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized: false
        }
    })
}
else{
 pool = new pg.Pool({
    database: "tasks_To_Do",
    host: "localhost",
    port: 5432
});
}


//GET
router.get('/', (req,res) => {
    //grabs from the database, all the current tasks and orders them by id
    let queryText = `SELECT * FROM "tasks" ORDER BY "id";`; // , "task" ASC? or ORDERED BY "complete"?
    console.log('Inside GET', queryText);

    //has the data from database ready to send back to the client
    pool.query(queryText)
    .then((result) => {
        console.log('Diving in the pool', result.rows);
        res.send(result.rows)
    }).catch((err) => {
        console.log('error in GET', err)
        res.sendStatus(500);
    })
})

//POST
router.post('/', (req, res) =>{
    //using body-parser to be able to send back the input values from user
    const newTask = req.body;
    console.log('Inside making the req.body', newTask);

    //these are the new tasks to place onto the DOM and used the 'Hacker no Hacker' way so data stays safe
    let queryText = `INSERT INTO "tasks" ("task", "complete")
    VALUES( $1, $2)`  

    //data ready to tranfer, this goes into the database and then is ready to send over to client
    pool.query(queryText, [newTask.task, Boolean(newTask.complete)])
    .then((result) => {
    res.sendStatus(201);
}).catch((err) => {
    console.log('Oh no, the inputs did not go through', err);
    res.sendStatus(500);
});
});

//DELETE
router.delete('/:id', (req, res) => {
    //this makes the data tranferable with req.body
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);

    //this deletes using the id
    let queryText = `DELETE FROM "tasks" WHERE id= $1;`;

    pool.query(queryText, [reqId])
    .then((result) => {
        console.log('task delete');
        res.sendStatus(200)
    }).catch((err) => {
        console.log(`error making database query ${queryText}`, err);
        res.sendStatus(500);
    })
})

//PUT
router.put('/:id', (req, res) => {
    const taskToAddId = req.params.id;
    console.log('Inside PUT id', taskToAddId);

    //this Updates the database to TRUE in the completes column
    let queryText = `UPDATE "tasks" SET "complete" = TRUE WHERE "id"= $1`;
    //to be able ot switch back to not complete UPDATE "tasks" SET "complete" = NOT "complete" WHERE "id"=$1

    //this tranfers that TRUE over to the client side and changes in the database
    pool.query(queryText, [taskToAddId])
    .then((result) => {
        console.log('You got the complete button id');
        res.sendStatus(200)
    }).catch((err) => {
        console.log('Error in your PUT', err);
        res.sendStatus(500);
    })
})


module.exports = router;