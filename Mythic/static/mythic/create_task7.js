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

    // handling drag  
    const initSortableList = (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        // Getting all items except currently dragging and making array of them
        let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
        let dragged_item = sortableList.querySelector(".item.dragging");

        // Finding the sibling after which the dragging item should be placed
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
            
        if (typeof nextSibling != 'undefined'){
            if (e.clientX >= nextSibling.offsetLeft + nextSibling.offsetWidth / 2){
                dragged_item.classList.add("indented");
                
            }
            else {
                dragged_item.classList.remove("indented");
            }
        }
        sortableList.insertBefore(draggingItem, nextSibling);
    }

    function set_order() {
        updated_list = document.querySelectorAll(".item:not(.indented)");
        updated_list.forEach(function(item, index) {

            arry = item.children[1].id.split("-");
            task_id = arry[arry.length-1];
         
            fetch(`/task/${task_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    order: index,
                    parent: "",
                })
            });
        });

        //if a task is indented, find first task above that is not indented. Make that the parent.
        all_tasks = document.querySelectorAll(".item");
        all_tasks.forEach((item, index) => {
            if (item.classList.contains('indented')) {
                console.log("Indented item at index " + index.toString());
                let firstNonIndentedBefore = null;

                for (let i = index - 1; i >= 0; i--) {
                    
                    if (!all_tasks[i].classList.contains('indented')) {
                        firstNonIndentedBefore = all_tasks[i];
                        console.log(firstNonIndentedBefore);
                        console.log(item);
                        break;
                    }
                }
                
                if (firstNonIndentedBefore != null) {
                    child_arry = item.firstElementChild.id.split("-");
                    child_id = child_arry[child_arry.length-1];

                    parent_arry = firstNonIndentedBefore.firstElementChild.id.split("-");
                    parent_id = parent_arry[parent_arry.length-1];
            
                    fetch(`/task/${child_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            parent: parent_id, 
                        })
                    }); 
                }
                

            } 
        });
    
    }
    
    sortableList.addEventListener("dragover", initSortableList);
    sortableList.addEventListener("dragenter", e => e.preventDefault());
    sortableList.addEventListener("dragend", set_order);
});

function edit_task(task_id){
    //Fill in description
    document.querySelector(`#edit-task-input-${task_id}`).value = document.querySelector(`#edit-task-body-${task_id}`).children[0].innerHTML.trim();

    //turn off draggable
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.setAttribute('draggable', 'false');
    });

    //fetch dates
    fetch(`/task/datetime/${task_id}`, {
        method: 'GET',
    })
    .then(response => response.json()) 
    .then (datetimes => {
    
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
    const items = document.querySelectorAll(".item");


    fetch(`/task/${task_id}`, {
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
        list_item = document.querySelector(`#edit-task-body-${task_id}`).children[0];
        list_item.innerHTML = description;
        date = document.querySelector(`#edit-task-body-${task_id}`).children[1];
        date.innerHTML = `<span class="material-symbols-outlined">schedule</span> ${due_date} <span class="material-symbols-outlined">
event
</span> ${scheduled_date}`

        
        /* 
        //create new tooltip
        const tooltip = document.createElement('span');
        tooltip.innerHTML = "Click on the text to edit";
        tooltip.setAttribute('class', 'tooltiptext');
        list_item.append(tooltip); */

        //hide input and show task
        document.querySelector(`#edit-task-form-${task_id}`).style.display = 'none';
        document.querySelector(`#edit-task-body-${task_id}`).style.display = 'flex';
        //turn draggable back on
        items.forEach(item => {
            item.setAttribute('draggable', 'true');
        });
    }) 
       
}

function complete(task_id){
    // get checkbox and check if checked.
    checked = document.querySelector(`#checkbox-${task_id}`).checked;
    fetch(`/task/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed: checked,
        })
    })
    .then(response => {
       
    }) 
}