console.log('In client.js');

$(document).ready(onReady)

function onReady(){
    console.log('Inside onReady');
    //listeners here!  Will be buttons
    //submit
    $('#submitTaskBtn').on('click', addTask);
    //delete
    $('#listOfTasksAdded').on('click', '#deleteBtn', deleteBtn);
    //complete
    $('#listOfTasksAdded').on('click', '#completeBtn', taskCompleteBtn);

    //also going to want to call GET function here
    getTasks();
}

//PUT
function taskCompleteBtn(){
    console.log('Inside taskCompleteBtn');

    const idToComplete = $(this).parent().parent().data().id;

    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToComplete}`
    }).then((result) => {
        getTasks();
    }).catch((err) => {
        alert('Task PUT did not work');
    })
};

//DELETE
function deleteBtn(){
    console.log('Inside deleteBtn');
    const idToDelete = $(this).parent().parent().data().id;
    console.log('ID to delete', idToDelete);

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


//POST
function addTask(){
    console.log('Inside addTask()');

    let taskToSend = {
        task: $('taskInput').val(),
    };

    console.log('task added', taskToSend);

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then((result) => {
        console.log('result in POST');
        getTasks();
    }).catch((err) => {
        console.log('Oh No, No task added', err);
        alert('Bad Task!');
    })
}
//GET
function getTasks(){
    console.log('Inside getTasks()');

    //grab the tasks with an ajax
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then((result) => {
        console.log('Inside getTasks', result);
        render(result)
    });

};

//Render to the DOM
function render(object){
    console.log('Inside render()');

    $('#listOfTasksAdded').empty()

    for(let i=0; i<object.length; i++){

        $('#listOfTasksAdded').append(`
        <tr data-id=${object[i].id}>
            <td>${object[i].task}</td>
            <td>${object[i].complete}</td>
            <td><button id="completeBtn">Complete</button></td>
            <td><button id="deleteBtn">Delete</button></td>
        `)
    }

}