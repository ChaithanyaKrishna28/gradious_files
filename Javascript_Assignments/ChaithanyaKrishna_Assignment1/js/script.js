document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate each input field
        const fname = document.getElementById('fname').value;
        const email = document.getElementById('email').value;
        // Add validation for other fields

        const fnameRegex = /^[a-zA-Z\s]+$/; // Example regex for name validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Example regex for email validation

        if (!fnameRegex.test(fname)) {
            displayWarning('fname', 'Please enter a valid name.');
            return;
        }

        if (!emailRegex.test(email)) {
            displayWarning('email', 'Please enter a valid email address.');
            return;
        }

        // If all fields are valid, store user input in local storage
        localStorage.setItem('fname', fname);
        localStorage.setItem('email', email);
        // Store other form fields similarly

        // Show success message
        alert('Your details have been successfully stored in the local storage.');
    });

    // Function to display warning messages
    function displayWarning(fieldId, message) {
        const warningMsg = document.createElement('span');
        warningMsg.classList.add('warning');
        warningMsg.textContent = message;

        const field = document.getElementById(fieldId);
        field.parentNode.appendChild(warningMsg);
    }

    // Populate form fields with stored information on page load
    const storedFname = localStorage.getItem('fname');
    if (storedFname) {
        document.getElementById('fname').value = storedFname;
    }
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
        document.getElementById('email').value = storedEmail;
    }
    // Populate other form fields similarly
});
