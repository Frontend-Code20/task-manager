
// Function to create a new list
export async function createNewList(listName, listItems) {
    try {
        // Retrieve the token from sessionStorage for authentication
        const token = window.sessionStorage.getItem('token');

        // POST request to the API to create a new list
        const response = await fetch('http://localhost:1337/api/list/create-list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization header with the token
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify({ listName, listItems }) // Passing the list name and items as the body
        });

        // Parse the response to JSON and return it
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Function to update an existing list
export async function updateList(listName, listItems, listId) {
    try {
        // Retrieve the token from sessionStorage for authentication
        const token = window.sessionStorage.getItem('token');

        // POST request to the API to update the list
        const response = await fetch('http://localhost:1337/api/list/update-list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization header with the token
                'Content-Type': 'application/json' // Specify JSON content type 
            },
            body: JSON.stringify({ listItems, listName, listId }) // Passing the updated list data
        });

        // Parse the response to JSON and return it
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Function to delete a list
export async function deleteList(listId) {
    try {
        // Retrieve the token from sessionStorage for authentication
        const token = window.sessionStorage.getItem('token');
        
        // POST request to the API to delete the list
        const response = await fetch('http://localhost:1337/api/list/delete-list', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization header with the token
                'Content-Type': 'application/json'  // Specify JSON content type
            },
            body: JSON.stringify({ listId }) // Passing the list ID to be deleted
        })

        // Parse the response to JSON and return it
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}