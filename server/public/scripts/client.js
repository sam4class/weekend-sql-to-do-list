console.log('In client.js');

$(document).ready(onReady)

//this function has everything that will appear when the DOM is loaded
function onReady() {
    console.log('Inside onReady');
    //listeners here! The button will be:

    //submit button: GET POST
    $('#submitBtn').on('click', addTask);
    console.log('Inside onClick submitbutton');

    //delete button: DELETE
    $('#listOfTasksAdded').on('click', '#deleteBtn', deleteBtn);

    //complete button: PUT
    $('#listOfTasksAdded').on('click', '#completeBtn', taskCompleteBtn);

    //this calls the GET function to keep DOM updated & grab the tasks already in database
    getTasks();
}

//PUT
function taskCompleteBtn() {
    console.log('Inside taskCompleteBtn');

    //targets the id of the complete button the user pushed
    const idToComplete = $(this).parent().parent().data().id;
    console.log('ID for completeBtn', idToComplete);

    //this shows us a TRUE for the id we clicked on DOM and database
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToComplete}`
    }).then((result) => {
        //keep things updated with our GET and render()
        getTasks();
    }).catch((err) => {
        alert('Task PUT did not work');
    })
};

//DELETE
function deleteBtn() {
    console.log('Inside deleteBtn');
    //this 'if' statement gives the user a pop-up to make sure they want to delete
    if (confirm("Are You Sure?")) {
        //this targets the task that will be deleted
        const idToDelete = $(this).parent().parent().data().id;
        console.log('ID to delete', idToDelete);

        //this ajax updates the DOM and the database with the chosen deleted task gone
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${idToDelete}`
        }).then((result) => {
            console.log('deleted task ID number', idToDelete);
            getTasks();
        }).catch((err) => {
            alert('Error deleting tasks', err);
        })

    }
    return false;
}

//POST
function addTask() {
    console.log('Inside addTask()');

    //this is the information we are given from the input fields the user fills out sent over from the server side
    let taskToSend = {
        task: $('#taskInput').val(),
        complete: $('#completeInput').val(),
    };
    console.log('task added', taskToSend);

    //this upates the DOM with exchanged data from the server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend,
    }).then((result) => {
        console.log('result in POST');
        //this empties the input fields once the submit button is pushed
        $('#taskInput').val('');
        $('#completeInput').val('');

        //Updates the DOM to show the current list of tasks with the one just added
        getTasks();
    }).catch((err) => {
        console.log('No task added', err);
        alert('Error in task added');
    })
}
//GET
function getTasks() {
    console.log('Inside getTasks()');

    //grab the "tasks" with an ajax
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then((result) => {
        console.log('Inside getTasks', result);
        render(result);
    });

};

//Render to the DOM
function render(object) {
    console.log('Inside render()');

    $('#listOfTasksAdded').empty()

    for (let i = 0; i < object.length; i++) {

        //this 'if' statement comes into play if the complete button is pushed, giving you a visual if the task is complete or not
        if (object[i].complete === false) {
            $('#listOfTasksAdded').append(`
        
        <tr data-id=${object[i].id}>
            <td>${object[i].task}</td>
            <td>${object[i].complete}</td>
            <td><button id="deleteBtn">Delete</button></td>
            <td id="completeId"><button id="completeBtn">Complete</button></td>
        </tr>
        `)
        } else if (object[i].complete === true) {
            $('#listOfTasksAdded').append(`
        
            <tr data-id=${object[i].id}>
                <td>${object[i].task}</td>
                <td>${object[i].complete}</td>
                <td><button id="deleteBtn">Delete</button></td>
                <td id="completeId">Completed!!</td>
            </tr>
            `)
        }
    }
}

