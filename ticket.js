document.addEventListener("DOMContentLoaded", function () {
    // Pull the data from localStorage using the exact keys saved in validation.js
    const savedName = localStorage.getItem("confUserName");
    const savedEmail = localStorage.getItem("confUserEmail");
    const savedGithub = localStorage.getItem("confUserGithub");
    const savedAvatar = localStorage.getItem("confUserAvatar");

    // If data exists, populate the ticket page elements
    if (savedName) {
        if (document.getElementById("ticketName")) {
            document.getElementById("ticketName").innerText = savedName;
        }
        if (document.getElementById("ticketEmail")) {
            document.getElementById("ticketEmail").innerText = savedEmail;
        }
        if (document.getElementById("ticketGithub")) {
            document.getElementById("ticketGithub").innerText = savedGithub;
        }
        if (document.getElementById("ticketAvatar") && savedAvatar) {
            document.getElementById("ticketAvatar").src = savedAvatar;
        }
    } else {
        // If someone goes straight to ticket.html without registering
        alert("Please fill out the registration form first!");
        window.location.href = "login.html";
    }
});



