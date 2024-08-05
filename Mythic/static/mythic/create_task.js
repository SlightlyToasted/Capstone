document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#task-item').addEventListener('click', create_task);
  });

/* function create_task(){
    description = document.querySelector('#create-body').value;
    due_date = document.querySelector('#create-due-date').value;
    schedule_date = document.querySelector('#create-schedule-date').value;

    fetch('/create', {
    method: 'POST',
        body: JSON.stringify({
            description: description,
            due_date: due_date,
            schedule_date: schedule_date,
        })
    })
    .then(response => response.json())
    .then(result => {
        alert("test create");
        document.querySelector('#create-body').value = "";
        document.querySelector('#create-due-date').value = "";
        document.querySelector('#create-schedule-date').value = "";
        location.reload()
        
    });
} */

function edit_task(task_id){
    old_text = document.querySelector(`#edit-task-body-${task_id}`).value;
    document.querySelector(`#edit-task-input-${task_id}`).style.display = 'block';
    document.querySelector(`#edit-task-btn-${task_id}`).style.display = 'block';
    document.querySelector(`#edit-task-body-${task_id}`).style.display = 'none';
    return false
    
}

function save_edit(task_id){
    alert("Test")
    description = document.querySelector(`#edit-task-input-${task}`).value;

    fetch(`/edit_task/${task_id}`, {
        method: 'POST',
            body: JSON.stringify({
                description: description
            })
        })
        .then(response => response.json())
        .then(result => {
            //reset input
            document.querySelector(`#edit-task-input-${task}`).value = "";

            //save new value into the list item 
            document.querySelector(`#edit-task-body-${task}`).innerHTML = document;

            //create new tooltip
            const tooltip = document.createElement('span');
            tooltip.innerHTML = "Click on the text to edit";
            tooltip.setAttribute('class', 'tooltiptext');
            document.querySelector(`#edit-task-body-${task}`).append(tooltip);

            //hide input and show task
            document.querySelector(`#edit-task-input-${task_id}`).style.display = 'none';
            document.querySelector(`#edit-task-btn-${task_id}`).style.display = 'none';
            document.querySelector(`#edit-task-body-${task_id}`).style.display = 'block';
            document.querySelector(`#edit-task-body-${task_id} > span`).style.display = 'block';
        });

    
}