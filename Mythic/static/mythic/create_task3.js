document.addEventListener('DOMContentLoaded', function() {
    
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
    //Fill in description
    old_text = document.querySelector(`#edit-task-body-${task_id}`).innerHTML;
    let cleaned_text = old_text.split("|");
    cleaned_text = cleaned_text.map(part => part.trim());
    document.querySelector(`#edit-task-input-${task_id}`).value = cleaned_text[0];

    //fetch dates
    fetch(`/task/datetime/${task_id}`, {
        method: 'GET',
    })
    .then(response => response.json()) 
    .then (datetimes => {
        console.log(datetimes);
        document.querySelector(`#input-due-date-${task_id}`).value = datetimes.due_date;
        document.querySelector(`#input-scheduled-date-${task_id}`).value = datetimes.scheduled_date;
        //document.querySelector(`#input-scheduled-date-${task_id}`).value = '2024-01-01';

        document.querySelector(`#edit-task-form-${task_id}`).style.display = 'block';
        document.querySelector(`#edit-task-body-${task_id}`).style.display = 'none';
        return false
    }) 
    
}

function save_edit(task_id){
    description = document.querySelector(`#edit-task-input-${task_id}`).value;
    due_date = document.querySelector(`#input-due-date-${task_id}`).value
    scheduled_date = document.querySelector(`#input-scheduled-date-${task_id}`).value


    console.log(description);
    fetch(`/edit_task/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            description: description,
            due_date: due_date,
            scheduled_date: scheduled_date,
        })
    })
    .then(response => {
        //reset input
        document.querySelector(`#edit-task-input-${task_id}`).value = "";

        //save new value into the list item 
        list_item = document.querySelector(`#edit-task-body-${task_id}`)
        list_item.innerHTML = `${description} | <b>Due on:</b> ${due_date} | <b>Scheduled for:</b> ${scheduled_date} `;

        //create new tooltip
        const tooltip = document.createElement('span');
        tooltip.innerHTML = "Click on the text to edit";
        tooltip.setAttribute('class', 'tooltiptext');
        list_item.append(tooltip);

        //hide input and show task
        document.querySelector(`#edit-task-form-${task_id}`).style.display = 'none';
        document.querySelector(`#edit-task-body-${task_id}`).style.display = 'inline';
    }) 
       
}