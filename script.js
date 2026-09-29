
// Request items stored in the todo-list and store them in an json file
async function fetchItems() {
    
    const response = await fetch("http://localhost:8080/api/items");
    const items = await response.json();
    displayAllItems(items);
    console.log(items)
}
// Iterate through all the items in the wishlist and call a display function
function displayAllItems(items) {
    items.items.forEach(item => {
        displayItem(item);
    });
}


// Display the items by creating them as new list entries and appending them to the list element 
function displayItem(item) {
    const orderedList = document.getElementById("list");
    const li = document.createElement("li");
    
    // Add a delete-button so items can be deleted
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    
    // Add complete-button so items can be marked as complete
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    
    
    
    li.textContent = item.name;
    completeButton.dataset.id = item.id;
    completeButton.done = item.done;
    deleteButton.dataset.id = item.id;
    
    li.appendChild(completeButton)
    li.appendChild(deleteButton)
    orderedList.appendChild(li)
    
    deleteButton.addEventListener("click", async (event) => {
        const response = await deleteItem(deleteButton.dataset.id, deleteButton);
        
        if (response.ok){
            deleteButton.parentElement.remove();
        }
    })
    completeButton.addEventListener("click", (event) =>{
        markCompleteToggle(completeButton)
    })
}

// Get clear-button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", (event) => {
    clearItems();
})

// Send delete request based on the id on the button clicked.
// Remove the DOM element based on the buttons parent list item
async function deleteItem(itemId) {
    const deletePath = `http://localhost:8080/api/items/${itemId}`
    const request = new Request(deletePath, 
        {
            method: "DELETE"
        }
    ); 
    const response = await fetch(request);
    
    return response;
    
}

// Use the buttons dataset to determine status of completeness
// and communicate this to the server
async function markCompleteToggle(completeButton) {
    
    completeButton.done = !completeButton.done; 

    const response = await fetch(`http://localhost:8080/api/items/${completeButton.dataset.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "done": completeButton.done })  
    })

    if(response.ok){
         if (completeButton.done){
        completeButton.style.backgroundColor = "lightgreen";
        }
        else{
            completeButton.style.backgroundColor = "";
        }  
    }

    
}

// Use GET to get a list of todo-list items and reuse the deleteitem function to
// delete all items. Fix the DOM by replacing children
async function clearItems(){
    const response = await fetch ("http://localhost:8080/api/items")
    const items = await response.json();

    
    const deleted = true;
    for (const item of items.items){
        
        const response = await deleteItem(item.id);
        if(!response.ok){
            deleted = false;
        }
    };
    
    const orderedList = document.getElementById("list");
    if(deleted){
        orderedList.replaceChildren();
    }
}



fetchItems();