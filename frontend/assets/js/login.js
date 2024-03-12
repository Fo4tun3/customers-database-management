const baseUrl = 'http://localhost:8888'
const login_btn = document.getElementById('login-btn');

login_btn.addEventListener('click', (e) => {
    e.preventDefault();
});

async function submitLoginForm() {
    const pageError = document.getElementById('pageerror');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const checkbox = document.querySelector('#remember-password');  
    
    if((!email) || (!password)) {
        pageError.innerHTML = 'Please fill in your details!';
        pageError.classList.add('pageerror');
        return; 
    }
    
    await fetch(baseUrl+'/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.match == true) {
            if (data.data.userData[0].status === 0) {
                pageError.innerHTML = 'Login successful!';
                pageError.classList.add('pagevalid');

                setTimeout(function() {
                    if (data.data.userData[0].role == 'admin') {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user_id", data.data.userData[0].user_id);
                        localStorage.setItem("email", data.data.userData[0].email);
                        localStorage.setItem("username", data.data.userData[0].username);
                        localStorage.setItem("user_role", data.data.userData[0].role);
                        window.location = "admin.html";
                    } 
                    else if(data.data.userData[0].role == 'user') {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user_id", data.data.userData[0].user_id);
                        localStorage.setItem("email", data.data.userData[0].email);
                        localStorage.setItem("username", data.data.userData[0].username);
                        localStorage.setItem("user_role", data.data.userData[0].role);
                        window.location = "user.html";
                    } 
                }, 3000);
            
            } else {
                pageError.innerHTML = 'Login failed. Account does not exists!';
                pageError.classList.add('pageerror');
            }
    
        } else {
            pageError.innerHTML = 'Login failed. Please check your credentials.';
            pageError.classList.add('pageerror');
        }
    });
}