document.addEventListener('DOMContentLoaded', function() {
    const sortableList = document.querySelector(".sortable-list");
    const items = sortableList.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("dragstart", () => {
            // Adding dragging class to item after a delay
            setTimeout(() => item.classList.add("dragging"), 0);
        });
        // Removing dragging class from item on dragend event
        item.addEventListener("dragend", () => item.classList.remove("dragging"));
    });

    // handling drag drop 
    const initSortableList = (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        // Getting all items except currently dragging and making array of them
        let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

        // Finding the sibling after which the dragging item should be placed
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
    
        sortableList.insertBefore(draggingItem, nextSibling);
    }

    function set_order () {
        updated_list = sortableList.querySelectorAll(".item");
        updated_list.forEach(function(item, index) {
            arry = item.children[0].id.split("-");
            task_id = arry[arry.length-1];
            fetch(`/task/order/${task_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    order: index,
                })
            }); 
        });
    }
    
    sortableList.addEventListener("dragover", initSortableList);
    sortableList.addEventListener("dragenter", e => e.preventDefault());
    sortableList.addEventListener("dragend", set_order);
});

function edit_task(task_id){
    //Fill in description
    old_text = document.querySelector(`#edit-task-body-${task_id}`).children[0].innerHTML;
    let cleaned_text = old_text.split("<");
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
    fetch(`/task/edit/${task_id}`, {
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
        list_item.innerHTML = `<span>${description} | <b>Due on:</b> ${due_date} | <b>Scheduled for:</b> ${scheduled_date} </span>`;
        
        /* 
        //create new tooltip
        const tooltip = document.createElement('span');
        tooltip.innerHTML = "Click on the text to edit";
        tooltip.setAttribute('class', 'tooltiptext');
        list_item.append(tooltip); */

        //hide input and show task
        document.querySelector(`#edit-task-form-${task_id}`).style.display = 'none';
        document.querySelector(`#edit-task-body-${task_id}`).style.display = 'inline';
    }) 
       
}

function move_up(task_id){
    fetch(`/task/reorder/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            direction: 'up',
        })
    })
    .then(response => {
        location.reload()
    }) 

}

function move_down(task_id){
    fetch(`/task/reorder/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            direction: 'down',
        })
    })
    .then(response => {
        location.reload()
    }) 

}