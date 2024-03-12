const baseurl = 'http://localhost:8888/api/v1'
// const baseurl = 'http://localhost:8888/api/v1'

const localUser_id = localStorage.getItem("user_id");
const localFirstname = localStorage.getItem('firstname')
const locallastname = localStorage.getItem('lastname')
const localname = localStorage.getItem('username')
const localEmail = localStorage.getItem("email");
const localMobile_no = localStorage.getItem('mobile_no')
const localDob = localStorage.getItem('dob')
const localState = localStorage.getItem('state')
const localSkill = localStorage.getItem('skill')

document.getElementById("update-firstname").value = `${localFirstname.replace(localFirstname[0], localFirstname[0].toUpperCase())}`;
document.getElementById("update-lastname").value = `${locallastname.replace(locallastname[0], locallastname[0].toUpperCase())}`;
document.getElementById("update-username").value = `${localname.replace(localname, localname.toLowerCase())}`;
document.getElementById("update-email").value = `${localEmail.replace(localEmail, localEmail.toLowerCase())}`;
document.getElementById("update-mobile_no").value = `${localMobile_no}`;
document.getElementById("update-dob").value = `${localDob.replace(localDob, localDob.slice(0, 10))}`;
document.getElementById("update-state").value = `${localState.replace(localState[0], localState[0].toUpperCase())}, Nigeria`;
document.getElementById("update-skill").value = `${localSkill.replace(localSkill[0], localSkill[0].toUpperCase())}`;

const profile_img = document.getElementById("profile-img");
// alert(localUser_id)
async function submitUpdateForm() {
    var firstname = document.getElementById("update-firstname").value;
    var lastname = document.getElementById("update-lastname").value;
    var username = document.getElementById("update-username").value;
    var email = document.getElementById("update-email").value;
    var dob = document.getElementById("update-dob").value;
    // var gender = document.querySelector(".radio_btn");
    var mobile_no = document.getElementById("update-mobile_no").value;
    var fullState = document.getElementById("update-state").value;
    var skill = document.getElementById("update-skill").value;
    var facebook_url = document.getElementById("facebook_url").value;
    var instagram_url = document.getElementById("instagram_url").value;
    var twitter_url = document.getElementById("twitter_url").value;
    // const pageerror = document.getElementById("pageerror");

    if((!firstname) || (!lastname) || (!username) || (!email) || (!dob) || (!mobile_no) || (!skill) || (!fullState) || (!facebook_url) || (!instagram_url) || (!twitter_url)) {
        // pageerror.innerHTML = 'Please fill in your Product\'s details correctly!';
        // pageerror.classList.add('pageerror');
        alert('hi')
        return;
    }


    // const form = document.getElementById('UpdateProfileForm');
    // const formData = new FormData(form);

    state = fullState.replace(fullState, fullState.slice(0, -9));
    const bodyData = {firstname, lastname, dob, mobile_no, username, state, skill, facebook_url, instagram_url, twitter_url}

    await fetch(baseurl+`/entreprenuers/update/${localUser_id}`, {
        method: 'PATCH',
        // body: formData,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( bodyData )
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem("entreprenuer_id", data.data.data.entreprenuer_id);
        localStorage.setItem("firstname", data.data.data.firstname);
        localStorage.setItem("lastname", data.data.data.lastname);
        localStorage.setItem("state", data.data.data.state);
        localStorage.setItem("dob", data.data.data.dob);
        localStorage.setItem("mobile_no", data.data.data.mobile_no);
        localStorage.setItem("skill", data.data.data.skill);
        localStorage.setItem("img_url", data.data.data.img_url);
        localStorage.setItem("facebook_url", data.data.data.facebook_url);
        localStorage.setItem("instagram_url", data.data.data.instagram_url);
        localStorage.setItem("twitter_url", data.data.data.twitter_url);
        localStorage.setItem("experience", data.data.data.experience);
        localStorage.setItem("gender", data.data.data.gender)
        localStorage.setItem("username", data.data.newUsername.username)


        if (data.data.success == true) {
            alert(data.data.message)
            window.location.href = '';
            // pageerror.innerHTML = 'Details Updated successfully!';
            // pageerror.classList.add('pagevalid');

            // setTimeout(function() {
            //     localStorage.removeItem("updatetoken");
            //     winxdow.location = 'entrepreneurs.html'
            // }, 3000);
                    
        } else if(data.success == false) {
            alert(data.data.message)
            // pageerror.innerHTML = 'Failed to Update Details! Please try again.';
            // pageerror.classList.add('pageerror');
        } else {
            alert('Something went wrong!!!')
            // pageerror.innerHTML = 'Error adding Details.';
            // pageerror.classList.add('pageerror');
        }
    })
}



//          ADDING A SKILL
const localEntreprenuer_id = localStorage.getItem("entreprenuer_id");

async function submitAddSkillForm() {
    var file = document.getElementById("file1"); 
    var name = document.getElementById("name").value;
    var location = document.getElementById("location").value;
    var price = document.getElementById("price").value;
    var start_date = document.getElementById("start_date").value;
    var period = document.getElementById("period").value;
    var description = document.getElementById("description").value;

    if((!name) || (!location) || (!price) || (!start_date) || (!period) || (!description)) {
        // pageerror.innerHTML = 'Please fill in your Product\'s details correctly!';
        // pageerror.classList.add('pageerror');
        alert('empty')
        return;
    }

    const form = document.getElementById('addSkillForm');
    const formData = new FormData(form);

    await fetch(baseurl+`/skills/${localEntreprenuer_id}`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        if (data.data.success == true) {
            alert(`${data.data.message}`)
            // toggleContent(4);
            // pageerror.innerHTML = 'Details Updated successfully!';
            // pageerror.classList.add('pagevalid');

            // setTimeout(function() {
            //     localStorage.removeItem("updatetoken");
            //     winxdow.location = 'entrepreneurs.html'
            // }, 3000);
                    
        } else if(data.success == false) {
            alert(`Skill could not be added try again...`)
            // pageerror.innerHTML = 'Failed to Update Details! Please try again.';
            // pageerror.classList.add('pageerror');
        } else {
            alert('Something went wrong! Try again later!!!')
            // pageerror.innerHTML = 'Error adding Details.';
            // pageerror.classList.add('pageerror');
        }
    })
}

async function displaySkills() {
    const allSkills_container = document.getElementById("allSkills");
    const skills_number = document.getElementById("skills_number");
    const total_skills_uploaded = document.getElementById("total_skills_uploaded");
    
    await fetch(baseurl+`/skills/entreprenuer/${localEntreprenuer_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.success == true) {
            allSkills_container.innerHTML = ``;
            skills_number.innerHTML = `My Skills (${item.data.length})`
            total_skills_uploaded.innerText = `${item.data.length}`

        setTimeout(() => {
            for (let i = 0; i < item.data.length; i++) {
                const skill_item = document.createElement("div");
                skill_item.classList.add('one_Skill');
                
                var imgurl = item.data[i].skill_url;
                skill_item.innerHTML = `
                <div class="mySkill_img">
                    <img src=${imgurl} alt="">
                </div>
                <div class="skill_details">
                    <h1>${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</h1>
                    <p>Location: ${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())}</p>
                    <p>Start date: ${item.data[i].start_date}</p>
                    <h4>Price: ₦${item.data[i].price}</h4>
                    <div class="manage_btns">
                        <input class="edit_myskill" type="button" value="Edit" onclick="onclick="goToEditSkillPage(${item.data[i].skill_id})"">
                        <input class="del_myskill" type="button" value="Delete" onclick="showDeleteSkillPopUp(${item.data[i].skill_id});">
                    </div>
                </div>`
                allSkills_container.appendChild(skill_item);
            }
        }, 7000);
        return;
        }
    })
}

// document.addEventListener('DOMContentLoaded', function () {
    function showDeleteSkillPopUp(skill_id) {
        const popupButtons = document.querySelectorAll('.del_myskill');
        // const editPopupButton = document.querySelectorAll('.edit_myskill');
        const popupContainer = document.querySelector('.delete_myskill_action');
        // const editPopupContainer = document.querySelector('.edit_myskill_action');
        const nobtn = document.querySelector('.no');
        // const yesbtn = document.querySelector('#yes');
        const closeButtons = document.querySelectorAll('#closeButton');
    
        function openPopup(index) {
            popupContainer.classList.remove('hidden');
            // document.body.style.overflow = 'hidden';
        }
        // function openEditPopup(index) {
        //     editPopupContainer.classList.remove('hidden');
        //     // document.body.style.overflow = 'hidden';
        // }
    
        function closePopup(index) {
            popupContainer.classList.add('hidden');
            // document.body.style.overflow = 'auto';
        }
        
        popupButtons.forEach((button, index) => {
            button.addEventListener('click', () => openPopup(index));
        })
        // editPopupButton.forEach((button, index) => {
        //     button.addEventListener('click', () => openEditPopup(index));
        // })
        closeButtons.forEach((closeButton, index) => {
            closeButton.addEventListener('click', () => closePopup(index));
        })
    
        nobtn.addEventListener('click', () => closePopup());
    
    
        window.addEventListener('click', function(event) {
            // console.log(event.target);
            if (event.target === popupContainer) {
                closePopup();
            }
        })

        const yes = document.getElementById("yesskill"); console.log(skill_id);
        yes.addEventListener('click', async () => {
            await fetch(baseurl+`/skills/delete/ent=${localEntreprenuer_id}/id=${skill_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(item => {
                console.log(item);
                closePopup();
                if (item.data.success == true) {
                    alert('Product item deleted successfully!!!');
                    window.location.href = 'entrepreneurs.html';
                    window.location.href = 'entrepreneurs.html#content3';
                } else if(!item) {
                    alert('Something went wrong!!!');
                }
            })
            return;
        })
    };
    // });


    // CHANGE PASSWORD
    async function changePassword() { 
        var oldpassword = document.getElementById("oldPassword").value;
        var newpassword = document.getElementById("newPassword").value;
        var confNewPassword = document.getElementById("confNewPassword").value;
        const oldPassword_error = document.querySelector(".oldPassword_error");
        
        var oldpassword_input = document.getElementById("oldPassword");
        var newPassword_input = document.getElementById("newPassword");
        var confirm_NewPassword = document.getElementById("confNewPassword");
        var newPassword_error = document.querySelector(".newPassword_error");
        var confNewPassword_error = document.querySelector(".confNewPassword_error");
        
        if(oldpassword_input.value === ''){
            oldPassword_error.innerText = 'Please type a password';
            oldPassword_error.classList.add('error');
        }
        else {
            oldPassword_error.innerText = '';
            oldPassword_error.classList.add('error');
        }
    
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
                newPassword_error.innerText = '';
                newPassword_error.classList.add('error');
            }else {
                newPassword_error.innerText = 'Password must contain: An uppercase, A lowercase, A number, A special character';
                newPassword_error.classList.add('error');
                return;
            }
        }
        if(newPassword_input.value === ''){
            newPassword_error.innerText = 'Please type a password';
            newPassword_error.classList.add('error');
            return;
        }
        else if(newPassword_input.value.trim().length < 8){
            newPassword_error.innerText = 'Password should be at least 8 characters';
            newPassword_error.classList.add('error');
        }
        else{
            check_password(newPassword_input.value);
        }
        
        if(confirm_NewPassword.value === ''){
            confNewPassword_error.innerText = 'Confirm your password';
            confNewPassword_error.classList.add('error');
            return;
        }else{
            confNewPassword_error.innerText = '';
            confNewPassword_error.classList.add('error');
        }
        if(confirm_NewPassword.value !== newPassword_input.value){
            confNewPassword_error.innerText = 'Confirm that your password is the same';
            confNewPassword_error.classList.add('error');
        }    
    
        await fetch(baseurl+`/auth/oldpassword/${localEmail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldpassword })
        })
        .then(response => response.json())
        .then(item => {
            console.log(item);
    
            if (item.match == true) {
                async function patchPassword() {
                    await fetch(baseurl+`/auth/password-change/${localEmail}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ newpassword })
                    })
                    .then(response => response.json())
                    .then(item => {
                        console.log(item);
                        if (item.data.success == true) {
                            alert(item.data.message);
                            window.location.href = 'entrepreneurs.html'
                        } else {
                            alert("Something went wrong. Couldn't Change Password...");
                            window.location.href = 'entrepreneurs.html'
                        }
                    })
                }
                patchPassword();
            } else if (item.match == false) {
                alert("You entered the wrong password!");
            }
        })
    }


    // const localEntreprenuer_id = localStorage.getItem("learner_id");

    async function displayCart() {
        const allCarts_container = document.getElementById("allCarts");
        const products_Carts_container = document.getElementById("products_Carts");
        
        
        function addQuantity() {
            counter = counter + 1;
            // console.log(counter);
            alert(counter)
        }
        function reduceQuantity() {
            counter = counter - 1;
            alert(counter)
        }
    
    
        await fetch(baseurl+`/cart/entreprenuer/${localEntreprenuer_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            document.querySelectorAll("#cart_number").forEach(id => id.innerHTML = (item.data.cart_info.length + item.data.cart_product.length));
            
            if (item.success == true) {
                for (let i = 0; i < item.data.cart_info.length; i++) {
                    document.querySelectorAll("#skill_cart_number").forEach(id => id.innerHTML = (item.data.cart_info.length));
    
                    const cart_item = document.createElement("div");
                    cart_item.classList.add('one_CartSkill');
                    
                    var imgurl = item.data.cart_info[i].skill_url;
                    cart_item.innerHTML = `
                    <div class="mySkill_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="skill_details skillcart_details">
                        <h1>${item.data.cart_info[i].name.replace(item.data.cart_info[i].name[0], item.data.cart_info[i].name[0].toUpperCase())}</h1>
                        <p>Location: ${item.data.cart_info[i].location.replace(item.data.cart_info[i].location[0], item.data.cart_info[i].location[0].toUpperCase())}</p>
                        <p>Period: ${item.data.cart_info[i].period}</p>
                        <h4>Price: ₦${item.data.cart_info[i].price}</h4>
                        <div class="manage_btns cart_skill_btns">
                            <!-- <input class="edit_myskill" type="button" value="Book" onclick="window.location.href = 'skill-payment.html'"> --!>
                            <input class="del_myskill" type="button" value="Delete" onclick="showPopUp(${item.data.cart_info[i].cart_id}); ">
                        </div>
                    </div>`
                    allCarts_container.appendChild(cart_item);
                    
                }
    
                // TO CALCULATE THE TOTAL SKILL CART PRICE
                let totalPrice = 0;
                let fee = 0.06; // 6% fee
                let totalFee = 0; 
                item.data.cart_info.forEach(item => {
                    totalPrice += item.price;
    
                    let itemFee = item.price * fee;
                    totalFee += itemFee;
                });
                let total_skill_payment = totalPrice + totalFee;
                document.querySelectorAll("#skills_total").forEach(id => id.innerHTML = totalPrice);
                document.querySelectorAll("#skill_fee").forEach(id => id.innerHTML = totalFee);
                document.querySelectorAll("#skill_total").forEach(id => id.innerHTML = total_skill_payment);
    
                for (let i = 0; i < item.data.cart_product.length; i++) {
                    document.querySelectorAll("#product_cart_number").forEach(id => id.innerHTML = (item.data.cart_product.length));
    
                    const cart_item = document.createElement("div");
                    cart_item.classList.add('one_CartProduct');
                    
                    var imgurl = item.data.cart_products_info[i].product_url;
                    cart_item.innerHTML = `
                    <div class="mySkill_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="product_details">
                        <h1>${item.data.cart_products_info[i].name.replace(item.data.cart_products_info[i].name[0], item.data.cart_products_info[i].name[0].toUpperCase())}</h1>
                        <p>Location: ${item.data.cart_products_info[i].location.replace(item.data.cart_products_info[i].location[0], item.data.cart_products_info[i].location[0].toUpperCase())}</p>
                        <p>Kaduna, Nigeria</p>
                        <h4>Price: ₦${item.data.cart_products_info[i].price}</h4>
                        <div class="product_btns">
                            <div class="product_counter">
                                <input class="minus" id="minus" type="text" value="-" disabled onclick="reduceQuantity();">
                                    <input class="counter" id="counter" type="text" value="1" disabled maxlength="99">
                                <input class="plus" id="plus" type="text" value="+" disabled onclick="addQuantity();">
                            </div>
                            <input class="del_myproduct" type="button" value="Delete" onclick="showProductPopUp(${item.data.cart_products_info[i].cart_id}); ">
                        </div>
                    </div>`
                    // <input class="edit_myskill" type="button" value="Checkout" onclick="initializePayment(${item.data.cart_products_info[i].price})"> from line 90
                    products_Carts_container.appendChild(cart_item);
                }
    
                // TO CALCULATE THE TOTAL PRODUCT CART PRICE
                let totalProductPrice = 0;
                let Productfee = 0.05; // 5% fee
                let totalProductFee = 0; 
                item.data.cart_products_info.forEach(item => {
                    totalProductPrice += item.price;
    
                    let productItemFee = item.price * Productfee;
                    totalProductFee += productItemFee;
                });
                let total_product_payment = totalProductPrice + totalProductFee;
                document.querySelectorAll("#products_total").forEach(id => id.innerHTML = totalProductPrice);
                document.querySelectorAll("#products_fee").forEach(id => id.innerHTML = totalProductFee);
                document.querySelectorAll("#products_total_amount").forEach(id => id.innerHTML = total_product_payment);
                
            return;
            }
        })
    
        const minus = document.getElementById("minus");
        const counter = document.getElementById("counter").value;
        const plus = document.getElementById("plus");
        // console.log(counter)
        minus.addEventListener('click', () => {
            reduceQuantity();
            counter = counter + 1;
            // console.log(counter);
            alert(counter)
        })
        plus.addEventListener('click', () => {
            addQuantity();
            counter = counter + 1;
            // console.log(counter);
            alert(counter)
        })
    }
    
    function showPopUp(cart_id) {
        const popupButtons = document.querySelectorAll('.del_myskill');
        const editPopupButton = document.querySelectorAll('.edit_myskill');
        const popupContainer = document.querySelector('#delete_cart_action');
        const editPopupContainer = document.querySelector('.edit_myskill_action');
        const nobtn = document.querySelector('.no');
        const yesbtn = document.querySelector('#yes');
        const closeButtons = document.querySelectorAll('#closeButton');
        const overlay = document.getElementById('overlay');
    
    
        function openPopup(index) {
            popupContainer.classList.remove('hidden');
            overlay.style.display = 'block'
            document.body.style.overflow = 'hidden';
        }
        function openEditPopup(index) {
            editPopupContainer.classList.remove('hidden');
            overlay.style.display = 'block'
            document.body.style.overflow = 'hidden';
        }
    
        function closePopup(index) {
            popupContainer.classList.add('hidden');
            overlay.style.display = 'none'
            // document.body.style.overflow = 'auto';
        }
    
        overlay.addEventListener('click', () => {
            popupContainer.classList.add('hidden');
            overlay.style.display = 'none'
            document.body.style.overflow = 'auto';
        })
        
        popupButtons.forEach((button, index) => {
            button.addEventListener('click', () => openPopup(index));
        })
        editPopupButton.forEach((button, index) => {
            button.addEventListener('click', () => openEditPopup(index));
        })
        closeButtons.forEach((closeButton, index) => {
            closeButton.addEventListener('click', () => closePopup(index));
        })
    
        nobtn.addEventListener('click', () => closePopup());
    
    
        window.addEventListener('click', function(event) {
            // console.log(event.target);
            if (event.target === popupContainer) {
                closePopup();
            }
        })
    
        const yes = document.getElementById("yes");
        yes.addEventListener('click', async () => {
            await fetch(baseurl+`/cart/delete/${cart_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(item => {
                console.log(item);
                closePopup();
                if (item.data.success == true) {
                    alert('Cart item deleted successfully!!!');
                    window.location.href = 'entrepreneurs.html';
                    window.location.href = 'entrepreneurs.html#content3';
                } else if(!item) {
                    alert('Something went wrong!!!');
                }
            })
            return;
        })
    };
    
    
    function showProductPopUp(cart_id) {
        const popupButtons = document.querySelectorAll('.del_myproduct');
        const editPopupButton = document.querySelectorAll('.edit_myskill');
        const popupContainer = document.querySelector('#delete_cart_action');
        const editPopupContainer = document.querySelector('.edit_myskill_action');
        const nobtn = document.querySelector('.no');
        const yesbtn = document.querySelector('#yes');
        const closeButtons = document.querySelectorAll('#closeButton');
        const overlay = document.getElementById('overlay');
    
    
        function openPopup(index) {
            popupContainer.classList.remove('hidden');
            overlay.style.display = 'block'
            document.body.style.overflow = 'hidden';
        }
        function openEditPopup(index) {
            editPopupContainer.classList.remove('hidden');
            overlay.style.display = 'block'
            document.body.style.overflow = 'hidden';
        }
    
        function closePopup(index) {
            popupContainer.classList.add('hidden');
            overlay.style.display = 'none'
            // document.body.style.overflow = 'auto';
        }
    
        overlay.addEventListener('click', () => {
            popupContainer.classList.add('hidden');
            overlay.style.display = 'none'
            document.body.style.overflow = 'auto';
        })
        
        popupButtons.forEach((button, index) => {
            button.addEventListener('click', () => openPopup(index));
        })
        editPopupButton.forEach((button, index) => {
            button.addEventListener('click', () => openEditPopup(index));
        })
        closeButtons.forEach((closeButton, index) => {
            closeButton.addEventListener('click', () => closePopup(index));
        })
    
        nobtn.addEventListener('click', () => closePopup());
    
    
        window.addEventListener('click', function(event) {
            // console.log(event.target);
            if (event.target === popupContainer) {
                closePopup();
            }
        })
    
        const yes = document.getElementById("yes");
        yes.addEventListener('click', async () => {
            await fetch(baseurl+`/cart/delete/${cart_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(item => {
                console.log(item);
                closePopup();
                if (item.data.success == true) {
                    alert('Cart item deleted successfully!!!');
                    window.location.href = 'entrepreneurs.html';
                    window.location.href = 'entrepreneurs.html#content3';
                } else if(!item) {
                    alert('Something went wrong!!!');
                }
            })
            return;
        })
    };
    

    
// DELETING ACCOUNT FUNCTION

    async function deleteaccount() {
        localStorage.removeItem('entreprenuer_id');
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
        localStorage.removeItem('facebook_url')
        localStorage.removeItem('instagram_url')
        localStorage.removeItem('twitter_url')
        localStorage.removeItem('experience')
    
        await fetch(baseurl+`/auth/delete-account/${localEmail}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data.success == true) {
                alert("Account Deleted Successfully")
            } else {
                alert("Failed to Delete Account")
            }
        })
        window.location = "index.html";
    }




//          ADDING A PRODUCT
// const localLearner_id = localStorage.getItem("learer_id");

async function submitAddProductForm() {
    var file = document.getElementById("file1"); 
    var name = document.getElementById("name").value;
    var location = document.getElementById("location").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;

    if((!name) || (!location) || (!price) || (!description)) {
        // pageerror.innerHTML = 'Please fill in your Product\'s details correctly!';
        // pageerror.classList.add('pageerror');
        alert('please fill the form correctly')
        return;
    }

    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);

    await fetch(baseurl+`/products/${localUser_id}`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
    setTimeout(function() {                  
        // }, 4000);

        if (data.data.success == true) {
            alert(`${data.data.message}`)
            // toggleContent(4);
            // pageerror.innerHTML = 'Details Updated successfully!';
            // pageerror.classList.add('pagevalid');

            // setTimeout(function() {
            //     localStorage.removeItem("updatetoken");
            //     winxdow.location = 'entrepreneurs.html'
            // }, 3000);
                    
        } else if(data.success == false) {
            alert(`Skill could not be added try again...`)
            // pageerror.innerHTML = 'Failed to Update Details! Please try again.';
            // pageerror.classList.add('pageerror');
        } else {
            alert('Something went wrong! Try again later!!!')
            // pageerror.innerHTML = 'Error adding Details.';
            // pageerror.classList.add('pageerror');
        }
    }, 4000);
    })
}

async function displayProducts() {
    const allSkills_container = document.getElementById("allSkills");
    const products_number = document.getElementById("products_number");
    const total_products_uploaded = document.getElementById("total_products_uploaded");
    
    await fetch(baseurl+`/products/user/${localUser_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        if (item.success == true) {
            allSkills_container.innerHTML = ``;
            products_number.innerHTML = `My Products (${item.data.length})`
            total_products_uploaded.innerHTML = `${item.data.length}`


            for (let i = 0; i < item.data.length; i++) {
                const skill_item = document.createElement("div");
                skill_item.classList.add('one_Skill');
                
                var imgurl = item.data[i].product_url;
                skill_item.innerHTML = `
                <div class="mySkill_img">
                    <img src=${imgurl} alt="">
                </div>
                <div class="skill_details">
                    <h1>${item.data[i].name.replace(item.data[i].name[0], item.data[i].name[0].toUpperCase())}</h1>
                    <p>Location: ${item.data[i].location.replace(item.data[i].location[0], item.data[i].location[0].toUpperCase())}</p>
                    <h4>Price: ₦${item.data[i].price}</h4>
                    <div class="manage_btns">
                        <input class="edit_myskill" type="button" value="Edit" onclick="goToEditProductsPage(${item.data[i].product_id})">
                        <input class="del_myskill" type="button" value="Delete" onclick="deleteMyProductPopUp(${item.data[i].product_id});">
                    </div>
                </div>`
                allSkills_container.appendChild(skill_item);
            }
        return;
        }
    })
}

function deleteMyProductPopUp(product_id) {
    const popupButtons = document.querySelectorAll('.del_myskill');
    // const editPopupButton = document.querySelectorAll('.edit_myskill');
    const popupContainer = document.querySelector('.delete_myskill_action');
    // const editPopupContainer = document.querySelector('.edit_myskill_action');
    const nobtn = document.querySelector('.no');
    // const yesbtn = document.querySelector('#yes');
    const closeButtons = document.querySelectorAll('#closeButton');
    const overlay = document.getElementById('overlay');


    function openPopup(index) {
        popupContainer.classList.remove('hidden');
        overlay.style.display = 'block'
        document.body.style.overflow = 'hidden';
    }
    // function openEditPopup(index) {
    //     editPopupContainer.classList.remove('hidden');
    //     overlay.style.display = 'block'
    //     document.body.style.overflow = 'hidden';
    // }

    function closePopup(index) {
        popupContainer.classList.add('hidden');
        overlay.style.display = 'none'
        // document.body.style.overflow = 'auto';
    }

    overlay.addEventListener('click', () => {
        popupContainer.classList.add('hidden');
        overlay.style.display = 'none'
        document.body.style.overflow = 'auto';
    })
    
    popupButtons.forEach((button, index) => {
        button.addEventListener('click', () => openPopup(index));
    })
    // editPopupButton.forEach((button, index) => {
    //     button.addEventListener('click', () => openEditPopup(index));
    // })
    closeButtons.forEach((closeButton, index) => {
        closeButton.addEventListener('click', () => closePopup(index));
    })

    nobtn.addEventListener('click', () => closePopup());


    window.addEventListener('click', function(event) {
        // console.log(event.target);
        if (event.target === popupContainer) {
            closePopup();
        }
    })

    const yes = document.getElementById("yesskill");
    yes.addEventListener('click', async () => {
        await fetch(baseurl+`/products/delete/user=${localUser_id}/id=${product_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            closePopup();
            if (item.data.success == true) {
                alert('Product item deleted successfully!!!');
                window.location.href = 'entrepreneurs.html';
                window.location.href = 'entrepreneurs.html#content3';
            } else if(!item) {
                alert('Something went wrong!!!');
            }
        })
        return;
    })
};


localStorage.removeItem("editProduct_id")

function goToEditProductsPage(product_id) {
    localStorage.setItem("editProduct_id", product_id);
    // alert(product_id);
    window.location.href = 'single-user-product.html';
}




// CHAT FUNCTIONALITY
async function getMessages() {
    const chat_container = document.getElementById("chat");
    const chat_id = 4321;

    await fetch(baseurl+`/chat/${chat_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);

        chat_container.innerHTML = '';
        const chat_header = document.createElement("div");
        chat_header.innerHTML = ` 
            <div class="chat_header">
                <div class="back_arrow" onclick="goBack();">
                    <img src="assets/images/icon/white-backward-arrow.png" alt="">
                </div>
                <div class="img_show">
                    <img src=${item.data[0].img_url} alt="">
                </div>
                <div class="person_name">
                    <h3 class="person_name_text">Fortune Ifeanyi (<span>Mentor</span>)</h3>
                    <p class="person_name_text">online</p>
                </div>
                <div class="phone_call">
                    <img src="assets/images/images/phone-calling.png" alt="">
                </div>
                <!-- <div class="menu">
                    <img src="assets/images/images/phone-calling.png" alt="">
                </div> -->
            </div>`
            chat_header.classList.add('chat_header');
            chat_container.appendChild(chat_header);

        if (item.success == true) {
            // for (let i = 0; i < item.data.length; i++) {
                let i = 0;
                const chatmessages = document.createElement("div");
                chatmessages.classList.add('message_area');
                
                chatmessages.innerHTML = `
                    <div class="sender_text">
                        <p>${item.data[i].message.replace(item.data[i].message[0], item.data[i].message[0].toUpperCase())}</p>
                    </div>
                    <div class="receiver_text">
                        <p>${item.data[i+1].message.replace(item.data[i+1].message[0], item.data[i+1].message[0].toUpperCase())}</p>
                    </div>
                    <div class="sender_text">
                        <p>${item.data[i+2].message.replace(item.data[i+2].message[0], item.data[i+2].message[0].toUpperCase())}</p>
                    </div>
                    <div class="sender_text">
                        <p>${item.data[i+3].message.replace(item.data[i+3].message[0], item.data[i+3].message[0].toUpperCase())}</p>
                    </div>
                    <div class="sender_text">
                        <p>${item.data[i+4].message.replace(item.data[i+4].message[0], item.data[i+4].message[0].toUpperCase())}</p>
                    </div>`

                chat_container.appendChild(chatmessages);
            // }

            const form = document.createElement("form");
                form.innerHTML = `
                    <div class="typing_text">
                        <div class="text_input">
                            <input type="text" placeholder="Type your text..." id="message">
                        </div>
                        <div class="submitText">
                            <input type="submit" name="newtext" id="submitText" value="Send" onclick="sendMessage();">
                        </div>
                    </div>`

            chat_container.appendChild(form);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // sendMessage();
            })
        return;
        }
    })
}

function goBack() {
    const back_arrow = document.querySelector(".back_arrow");
    const message_container = document.querySelector(".message_container");
    const new_chat = document.querySelector(".new_chat");

    message_container.style.display = 'block';
    new_chat.style.display = 'none';
}


async function sendMessage() {
    const chat_container = document.getElementById("chat");
    const message_input = document.getElementById("message").value;
    const chat_id = 4350;
    const entreprenuer_user_id = 21;
    const entreprenuer_id = 26;
    const bodyData = {
        chat_id : `${localUser_id}`+`${entreprenuer_user_id}`,
        receipient_id : entreprenuer_user_id,
        message : message_input
    }
    // console.log(bodyData);

    await fetch(baseurl+`/chat/${localUser_id}/send-to=${entreprenuer_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(item => {
        // console.log(item);
        alert(item.data.data.message)
        if (item.data.success == true) {
            for (let i = 0; i < item.data.length; i++) {
                const messages = document.createElement("div");
                messages.classList.add('sender_text');
                
                messages.innerHTML = `
                    <p>${item.data.data.message.replace(item.data.data.message[0], item.data.data.message[0].toUpperCase())}</p>
                `

                chat_container.appendChild(messages);
            }
        return;
        }
    })
}
