document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    signup();
});

function signup() {
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
    };
    

    fetch("http://127.0.0.1:5000/user/signup", {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            // Redirect to profile page if signup is successful
            return response.json().then(data => {
                window.location.href = "login.html";
            });
        } else {
            return response.json().then(data => {
                if (data.error) {
                    document.getElementById("message").innerHTML = data.error.description;
                  } else {
                    document.getElementById("message").innerHTML = data.message;
                  }

                //document.getElementById("message").innerHTML = data.message.description;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}