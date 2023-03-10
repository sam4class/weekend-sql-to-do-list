const express = require('express');
const router = express.Router();
const pg = require('pg');

//pg pool
const pool = new pg.Pool({
    database: "tasks_To_Do",
    host: "localhost",
    port: 5432
});

//GET
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "tasks";`;
    console.log('getting the dirty tasks from GET', queryText);

    pool.query(queryText)
    .then((result) => {
        console.log('Diving in the pool', result.rows);
        res.send(result.rows)
    }).catch((err) => {
        console.log('error in GET Sad face', err)
        res.sendStatus(500);
    })
})

//POST
router.post('/', (req, res) =>{
    const newTask = req.body;
    console.log('Inside making the req.body', newTask);

    let queryText = `INSERT INTO "tasks" ("task", "complete")
    VALUES( $1, $2)`  //if this brakes, look: is "task" or "tasks"?

    pool.query(queryText, [newTask.task, Boolen(newTask.complete)])
    .then((result) => {
    res.sendStatus(201);
}).catch((err) => {
    console.log('Oh no, the inputs did not go through', err);
    res.sendStatus(500);
});
});

//DELETE
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);

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

    let queryText = `UPDATE "tasks" SET "complete" = TRUE WHERE "id"= $1`;

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