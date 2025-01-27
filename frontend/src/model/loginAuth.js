/**
 * Handles the login form submission. It checks if the form is valid and then attempts
 * to log the user in by sending the credentials to the backend.
 * 
 * @param {Event} event - The event triggered by the form submission.
 * @param {HTMLFormElement} form - The login form element.
 * @returns {Promise<string|false>} - Returns a token if login is successful, otherwise `false` if failed.
 */
export async function LoginTo(event, form) {

    // Prevent form submission if the form is invalid
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Gather form data (email and password) from the form
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        // Call the login function and await the token response
        const token = await loginToAccount(email, password);

        // Return the token from the login function, indicating successful login
        return token;
    }

    // Mark the form as validated to show UI feedback
    form.classList.add('was-validated');
}

/**
 * Sends a request to the backend API to log in a user with the provided email and password.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|false>} - Returns a token object on success or `false` on failure.
 */
export async function loginToAccount(email, password) {
    try {

        // Make the login request to the API
        const response = await fetch('http://localhost:1337/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Send email and password in the request body
        });

        // Parse the response from the server
        const token = await response.json();

        // If the token is returned, assume the login was successful
        return token;
    } catch (error) {
        console.log(error);
        return false; // Return false if the login request fails
    }
}