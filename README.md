# INF2300 Assignment 2 - Web API Client

This project contains a simple TODO-list web client created for INF2300 Assignment 2.

The client communicates with the provided Flask server through the API at:

http://localhost:8080/api

## Requirements

- Python 3
- Flask
- Flask-CORS
- A modern web browser

## How to run

1. Open a terminal in the project directory.

2. Start the provided server:

python server.py

3. Verify that the server is running on port 8080.

4. Open index.html in a web browser.

The client should automatically request the current TODO-list from the server and display the items.

## How to verify the solution

The following functionality can be tested from the web interface:

### Display items
When the page is opened, the client sends a GET request to:

/api/items

All TODO-items returned by the server should be displayed in the list.

### Delete an item
Press the Delete button next to an item.

The client sends a DELETE request to:

/api/items/<item id>

If the request succeeds, the item is removed from the displayed list.

### Mark an item as complete
Press the Complete button next to an item.

The client sends a PUT request to:

/api/items/<item id>

with a JSON body containing the updated done value.

The button changes appearance when the item is marked as complete.

### Clear the TODO-list
Press the Clear button.

The client first retrieves the current items and then sends a DELETE request for each item in the list.

If all DELETE requests succeed, the displayed list is cleared.

### Error handling
Error handling can be tested by opening the client in two browser windows.

1. Open the client in both windows.
2. Delete an item in the first window.
3. Try to mark the same item as complete in the second window.

The second client will attempt to update an item that no longer exists on the server. The server returns an error response, and the client displays an error message and refreshes the TODO-list from the server.

## Project files

- index.html - Main web interface
- script.js - Client logic and API communication
- style.css - Styling for the web interface
- server.py - Provided Flask backend
- doc/ - Report and documentation

## Notes

The provided server.py file has not been modified.

The server stores the TODO-list in memory. All changes are therefore lost when the server is restarted.
