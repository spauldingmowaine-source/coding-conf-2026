document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById("registrationForm");

    if (form) {

        form.addEventListener("submit", function(event) {

            event.preventDefault();

            // Get form values
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const githubUser = document.getElementById("githubUser").value.trim();
            const avatarInput = document.getElementById("avatar");

            // Get error elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const githubError = document.getElementById("githubError");
            const avatarError = document.getElementById("avatarError");

            // Clear previous error messages
            nameError.textContent = "";
            emailError.textContent = "";
            githubError.textContent = "";
            avatarError.textContent = "";

            let isValid = true;

            // Validate full name
            if (fullName === "") {
                nameError.textContent = "Full name is required.";
                isValid = false;
            }

            // Validate email address
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            // Validate GitHub username
            if (!githubUser.startsWith("@") || githubUser.length < 2) {
                githubError.textContent = "GitHub username must begin with @.";
                isValid = false;
            }

            // Validate avatar image
            if (avatarInput.files.length === 0) {

                avatarError.textContent = "Please upload an avatar.";
                isValid = false;

            } else {

                const file = avatarInput.files[0];

                const allowedTypes = ["image/jpeg", "image/png"];

                // Check image format
                if (!allowedTypes.includes(file.type)) {
                    avatarError.textContent = "Only JPEG and PNG images are allowed.";
                    isValid = false;
                }

                // Check image size (500KB maximum)
                if (file.size > 500 * 1024) {
                    avatarError.textContent = "Image must be smaller than 500KB.";
                    isValid = false;
                }
            }

            // Continue if all fields are valid
            if (isValid) {

                const file = avatarInput.files[0];
                const reader = new FileReader();

                // Read the uploaded image
                reader.onload = function(event) {

                    const base64Image = event.target.result;

                    // Save registration information in LocalStorage
                    localStorage.setItem("confUserName", fullName);
                    localStorage.setItem("confUserEmail", email);
                    localStorage.setItem("confUserGithub", githubUser);
                    localStorage.setItem("confUserAvatar", base64Image);

                    // Redirect to the ticket page
                    window.location.href = "ticket.html";
                };

                // Handle image reading errors
                reader.onerror = function() {
                    avatarError.textContent = "Unable to read image. Please try again.";
                };

                reader.readAsDataURL(file);
            }

        });

    }

});
