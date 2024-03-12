const username_input = document.querySelector('#username');      
const email_input = document.querySelector('#email');     
const user_role_input =  document.querySelector('input[name="user_role"]:checked');
const password_input = document.querySelector('#password');          
const confirm_password = document.querySelector('#confirm-password');
// const checkbox_input = document.querySelector('#checkbox');  

const username_error = document.querySelector('.username-error');      
const email_error = document.querySelector('.email-error');      
const role_error = document.querySelector('.role-error');      
const password_error = document.querySelector('.password-error');          
const confPassword_error = document.querySelector('.confirmPassword-error');
const checkbox_error = document.querySelector('.checkbox-error');      
const register_btn = document.getElementById('register-btn');

register_btn.addEventListener('click', (e) => {
    e.preventDefault();
});

username_input.addEventListener('input', (e) => {
    if(username_input.value === ''){
        username_erpassword_errorror.innerText = 'Please enter a name';
        username_errorusername_error.classList.add('error');   
    }
    else if(username_input.value.trim().length < 3){
        username_error.innerHTML = 'Name must be at least 3 characters';
        username_error.classList.add('error');
    }else{
        username_error.innerText = '';
        username_error.classList.add('error');
    }
})
email_input.addEventListener('input', (e) => {
    function check_email(email) {
        const email_list = /[@]/;
        const fullstop = /[.]/;
        if (
            email_list.test(email) &&
            fullstop.test(email) 
        ) {
            email_error.innerText = '';
            email_error.classList.add('error');
        }
        else {
            email_error.innerText = "Email must be in *****@example.com";
            email_error.classList.add('error');
        }
    }
    if(email_input.value === ''){
        email_error.innerText = 'Please enter an email';
        email_error.classList.add('error');
    } 
    else {
        check_email(email_input.value);
    }
})

// user_role_input.addEventListener('change', (e) => {
    if (user_role_input == '') {
        role_error.innerText = 'Please select your role!'
        email_error.classList.add('error');
    } else {
        role_error.innerText = ''
        email_error.classList.add('error');
    }
// });

password_input.addEventListener('input', (e) => {
    function check_password(password) {
        const uppercase_list = /[A-Z]/;
        const lowercase_list = /[a-z]/;
        const number_list = /[0-9]/;
        const special_list = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        if (
            uppercase_list.test(password) &&
            lowercase_list.test(password) &&
            number_list.test(password) &&
            special_list.test(password) 
        ) {
            password_error.innerText = '';
            password_error.classList.add('error');
        }else {
            password_error.innerText = 'Password must contain: An uppercase, A lowercase, A number, A special character';
            password_error.classList.add('error');
        }
    }
    if(password_input.value === ''){
        password_error.innerText = 'Please type a password';
        password_error.classList.add('error');
    }
    else if(password_input.value.trim().length < 8){
        password_error.innerText = 'Password should be at least 8 characters';
        password_error.classList.add('error');
    }
    else{
        check_password(password_input.value);
    }
})

confirm_password.addEventListener('input', (e) => {
    if(confirm_password.value === ''){
        confPassword_error.innerText = 'Confirm your password';
        confPassword_error.classList.add('error');
    }else{
        confPassword_error.innerText = '';
        confPassword_error.classList.add('error');
    }
    if(confirm_password.value !== password.value){
        confPassword_error.innerText = 'Confirm that your password is the same';
        confPassword_error.classList.add('error');
    }
})


// checkbox_input.addEventListener('input', (e) => {
//     // CHECKBOX
//     if(!checkbox_input.checked){
//         checkbox_error.innerText = 'You must accept the Terms and Conditions to continue!!';
//         checkbox_error.classList.add('checkbox_error');
//     }
//     else {
//         checkbox_error.innerText = '';
//         checkbox_error.classList.add('checkbox_error');
//     }
// })



const baseUrl = 'http://localhost:8888'
async function submitForm() {
    const username = document.querySelector('#username').value;      
    const email = document.querySelector('#email').value;     
    const user_role =  document.querySelector('input[name="user"]:checked').value;
    const password = document.querySelector('#password').value;          

    const pageErrorMessage = document.getElementById('pageerror');
    // const username = document.getElementById('username').value;
    // const email =  document.getElementById('email').value;
    // const user_role =  document.querySelector('input[name="user"]:checked').value;
    // const password = document.getElementById('password').value;
    
    const user = (username === '' || username.trim().length < 3)
    // const checkBox = (!checkbox_input.checked)
    // const radio = (!user_role_input.checked)

    if((user) || (!email) || (!password)) {
        pageErrorMessage.innerHTML = 'Please fill in your details correctly!';
        pageErrorMessage.classList.add('pageerror');
        return;
    }

    await fetch(baseUrl+'/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, user_role })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.data.success == true) {
            pageErrorMessage.innerHTML = 'Registration successful!';
            pageErrorMessage.classList.add('pagevalid');
            // localStorage.setItem("user_role", data.data.data.user_role);
            // localStorage.setItem("username", data.data.data.username);
            // localStorage.setItem("email", data.data.data.email);
            
            setTimeout(function() {
                window.location = "login.html";
                // if (data.data.data.role == 'admin') {
                //     window.location = "login.html";
                // } else if(data.data.data.role == 'user') {
                //     window.location = "login.html";
                // } 
                // else if(data.data.data.role == 'administrator') {
                //     window.location = "login.html";
                // }
            }, 3000);
        } else if(data.data.success == false) {
            pageErrorMessage.innerHTML = 'Email already exists.';
            pageErrorMessage.classList.add('pageerror');
        } else {
            pageErrorMessage.innerHTML = 'Something went wrong. Please try again.';
            pageErrorMessage.classList.add('pageerror');
        }
    });
}