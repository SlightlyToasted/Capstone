document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#create-submit').addEventListener('click', create_task);
  });

function create_task(){
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
}