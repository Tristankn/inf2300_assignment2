
// Request items stored in the todo-list and store them in an json file
async function fetchItems() {
    
    const response = await fetch("http://localhost:8080/api/items");
    const items = await response.json();
    displayAllItems(items);
    console.log(items)
}
// Iterate through all the items in the wishlist and call a display function
async function displayAllItems(items) {
    items.items.forEach(item => {
        displayItem(item);
    });
}

// Display the items by creating them as new list entries and appending them to the list element 
async function displayItem(item) {
    const orderedList = document.getElementById("list");
    const li = document.createElement("li");
    li.textContent = item.name;
    orderedList.appendChild(li)
}

fetchItems();