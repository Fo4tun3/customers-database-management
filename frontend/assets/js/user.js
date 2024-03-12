const username = localStorage.getItem('username')
const userEmail = localStorage.getItem('email')
const userMobile_no = localStorage.getItem('mobile_no')
const userDob = localStorage.getItem('dob')

img = `assets/images/icon/avatar3.png`
const fullname = document.getElementById("fullname");
// fullname.innerHTML = `${userFirstname.replace(userFirstname[0], userFirstname[0].toUpperCase())} ${Userlastname.replace(Userlastname[0], Userlastname[0].toUpperCase())}`;
const profile_img = document.getElementById("profile_img");
profile_img.src = img;


document.getElementById("username").innerHTML = `${username.replace(username[0], username[0].toUpperCase())}`;
document.getElementById("user-email").innerHTML = `${userEmail.replace(userEmail, userEmail.toLowerCase())}`;

// document.getElementById("update-firstname").value = `${userFirstname.replace(userFirstname[0], userFirstname[0].toUpperCase())}`;
// document.getElementById("update-lastname").value = `${Userlastname.replace(Userlastname[0], Userlastname[0].toUpperCase())}`;
// document.getElementById("update-username").value = `${username.replace(username, username.toLowerCase())}`;
// document.getElementById("update-email").value = `${userEmail.replace(userEmail, userEmail.toLowerCase())}`;
// document.getElementById("update-mobile_no").value = `${userMobile_no}`;
// document.getElementById("update-dob").value = `${userDob.replace(userDob, userDob.slice(0, 10))}`;
// document.getElementById("update-state").value = `${userState.replace(userState[0], userState[0].toUpperCase())}, Nigeria`;
// document.getElementById("update-mobile_no").value = `${userEmail.replace(userEmail, userEmail.toLowerCase())}`;

localStorage.removeItem("amount");

function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

const greeting = getGreeting();
// greetingElement.innerHTML = `${greeting}, ${username.replace(username[0], username[0].toUpperCase())}!`;

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token');
    localStorage.removeItem('updatetoken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('learner_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('state');
    localStorage.removeItem('dob');
    localStorage.removeItem('gender');
    localStorage.removeItem('mobile_no');
    localStorage.removeItem('skill');
    localStorage.removeItem('img_url');
    window.location = "index.html";

    localStorage.removeItem("amount");
}
// document.getElementById("logout").addEventListener("click", logout);


// //  my circle image
// const fileUpload = document.getElementById('file');
// const selectedItem = document.getElementById('selected-image');
// fileUpload.addEventListener('change', function () {
//     const file = fileUpload.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             selectedItem.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });
// //  my square image
// const fileUpload1 = document.getElementById('file1');
// const selectedItem1 = document.getElementById('selected-image1');
// fileUpload1.addEventListener('change', function () {
//     const file = fileUpload1.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             selectedItem1.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });

function toggleContent(elementId) {
    const content = [
        document.getElementById('content1'),
        document.getElementById('content2'),
        document.getElementById('content3'),
        document.getElementById('content4'),
    ];
    const elements = [
        document.getElementById('navlink1'),
        document.getElementById('navlink2'),
        document.getElementById('navlink3'),
        document.getElementById('navlink4'),
    ];
    const texts = [
        document.getElementById('text1'),
        document.getElementById('text2'),
        document.getElementById('text3'),
        document.getElementById('text4'),
    ];
    const text = document.getElementById('text');

    for (let i = 0; i < content.length; i++) {
        content[i].style.display = i + 1 === elementId ? 'block' : 'none';
        texts[i].style.color = i + 1 === elementId ? '#fff' : '#f4f4f4';
        elements[i].style.backgroundColor = i + 1 === elementId ? '#19205e' : 'transparent';
        elements[i].classList.add('first');
        if (elementId == 3 || elementId == 8) {
            document.querySelector(".main-layout").style.overflow = 'auto'
        } else {
            document.querySelector(".main-layout").style.overflow = 'auto'
        }
    }
}


var newPassword_input = document.getElementById("newPassword");
var confirm_NewPassword = document.getElementById("confNewPassword");
var newPassword_error = document.querySelector(".newPassword_error");
var confNewPassword_error = document.querySelector(".confNewPassword_error");

// newPassword_input.addEventListener('input', (e) => {
//     function check_password(password) {
//         const uppercase_list = /[A-Z]/;
//         const lowercase_list = /[a-z]/;
//         const number_list = /[0-9]/;
//         const special_list = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

//         if (
//             uppercase_list.test(password) &&
//             lowercase_list.test(password) &&
//             number_list.test(password) &&
//             special_list.test(password) 
//         ) {
//             newPassword_error.innerText = '';
//             newPassword_error.classList.add('error');
//         }else {
//             newPassword_error.innerText = 'Password must contain: An uppercase, A lowercase, A number, A special character';
//             newPassword_error.classList.add('error');
//         }
//     }
//     if(newPassword_input.value === ''){
//         newPassword_error.innerText = 'Please type a password';
//         newPassword_error.classList.add('error');
//     }
//     else if(newPassword_input.value.trim().length < 8){
//         newPassword_error.innerText = 'Password should be at least 8 characters';
//         newPassword_error.classList.add('error');
//     }
//     else{
//         check_password(newPassword_input.value);
//     }
// })

// confirm_NewPassword.addEventListener('input', (e) => {
//     if(confirm_NewPassword.value === ''){
//         confNewPassword_error.innerText = 'Confirm your password';
//         confNewPassword_error.classList.add('error');
//     }else{
//         confNewPassword_error.innerText = '';
//         confNewPassword_error.classList.add('error');
//     }
//     if(confirm_NewPassword.value !== newPassword_input.value){
//         confNewPassword_error.innerText = 'Confirm that your password is the same';
//         confNewPassword_error.classList.add('error');
//     }
// })



function seeDetails() {
    const popupButtons = document.querySelectorAll('.myskill_details');
    const popupContainer = document.querySelector('#SkillDetails-container');
    const closeButtons = document.querySelectorAll('#detailscloseButton');
    const overlay = document.getElementById('overlay');

    function openPopup(index) {
        popupContainer.classList.remove('hiddendetails');
        overlay.style.display = 'block'
        document.body.style.overflow = 'hidden';
    }

    function closePopup(index) {
        popupContainer.classList.add('hiddendetails');
        overlay.style.display = 'none'
        document.body.style.overflow = 'auto';
    }

    overlay.addEventListener('click', () => {
        popupContainer.classList.add('hiddendetails');
        overlay.style.display = 'none'
        document.body.style.overflow = 'auto';
    })

    popupButtons.forEach((button, index) => {
        button.addEventListener('click', () => openPopup(index));
    })
    closeButtons.forEach((closeButton, index) => {
        closeButton.addEventListener('click', () => closePopup(index));
    })

    window.addEventListener('click', function(event) {
        // console.log(event.target);
        if (event.target === popupContainer) {
            closePopup();
        }
    })
}
