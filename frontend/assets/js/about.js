const nav_btns = document.getElementById("nav_btns");
const hello_msg = document.getElementById("hello_msg");
const token = localStorage.getItem("token");
const localusername = localStorage.getItem("username");
if (token) {
    document.getElementById("username").innerHTML = `${localusername.replace(localusername[0], localusername[0].toUpperCase())}`;
    const nav_link = document.getElementById("nav_links_list_item");
    nav_link.innerHTML = `DASHBOARD`;
    nav_link.addEventListener('click', () => {
        gotoDaskboard();
    })
    nav_btns.style.display = 'none';
    hello_msg.style.display = 'block';
} else {
    const nav_link = document.getElementById("nav_links_list_item");
    nav_link.innerHTML = `HOME`;
    nav_link.addEventListener('click', () => {
        window.location.href = 'index.html#home';
    })
    nav_btns.style.display = 'block';
    hello_msg.style.display = 'none';
}


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
    window.location = "index.html"
}




const baseUrl = 'http://localhost:8888/api/v1'

function color(id) {
    let links = [
        document.querySelector(`#nav_links_list_item`),
        document.querySelector(`#nav_links_list_item1`),
        document.querySelector(`#nav_links_list_item2`),
        document.querySelector(`#nav_links_list_item3`),
        document.querySelector(`#nav_links_list_item4`)
    ]
    links.forEach(link => link.style.color = '#000')
    const nav_links_list_item = document.getElementById(`nav_links_list_item${id}`);
    nav_links_list_item.style.color = '#19205e';
}

function hoverColor() {
    let links = [
        document.querySelector(`#nav_links_list_item`),
        document.querySelector(`#nav_links_list_item${1}`),
        document.querySelector(`#nav_links_list_item${2}`),
        document.querySelector(`#nav_links_list_item${3}`),
        document.querySelector(`#nav_links_list_item${4}`)
    ]
    // links.forEach(link => link.style.color = '#000')
    links.forEach(link => link.addEventListener('hover', () => {
        link.style.color = '#19205e';
    }))
    // const nav_links_list_item = document.getElementById(`nav_links_list_item${id}`);
    // nav_links_list_item.classList.add("color");
    // nav_links_list_item.style.color = '#19205e';
}

// const subscriptionEmails_btn = document.getElementById('subscription_emails-btn');

// subscriptionEmails_btn.addEventListener('click', (e) => {
//     e.preventDefault();
// });

async function displayCart() {
    const allCarts_container = document.getElementById("cart_items");
    const role = localStorage.getItem("user_role");
    const localLearner_id = localStorage.getItem("learner_id")
    const localEntreprenuer_id = localStorage.getItem("entreprenuer_id")
    
    if (role == 'entrepreneur') {
        await fetch(`${baseUrl}/cart/entreprenuer/${localEntreprenuer_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            document.querySelectorAll("#cart_number").forEach(id => id.innerHTML = (item.data.cart_item.length + item.data.cart_product.length));
            document.querySelectorAll("#cart_number-title").forEach(id => id.innerHTML = `Cart items (${item.data.cart_item.length + item.data.cart_product.length})`);
            
            if (item.success == true) {
                allCarts_container.innerHTML = '';

                if (item.data.cart_info.length == 0) {
                    allCarts_container.innerHTML = '<h4 style="padding: 10px 0px; text-align: center;">Your cart basket is empty 😟😔🙁!</h4>';
                    return;
                }
                
                for (let i = 0; i < 2; i++) {
                    const single_item = document.createElement("div");
                    single_item.classList.add('single_item');
                    
                    var imgurl = item.data.cart_info[i].skill_url;
                    single_item.innerHTML = `
                    <div class="cart_item_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="item_desc">
                        <h2 class="text">${item.data.cart_info[i].name.replace(item.data.cart_info[i].name[0], item.data.cart_info[i].name[0].toUpperCase())}</h2>
                        <p class="text">${item.data.cart_info[i].location.replace(item.data.cart_info[i].location[0], item.data.cart_info[i].location[0].toUpperCase())}</p>
                        <p class="text">${item.data.cart_info[i].period}</p>
                        <h4 class="text price">₦${item.data.cart_info[i].price}</h4>
                        <div class="item_btns">
                            <button class="text">Book</button>
                            <div class="del">
                                <button id="del_btn" onclick = "deleteCart(${item.data.cart_info[i].cart_id})"><img src="assets/images/icons/delete2.png" alt=""></button>
                            </div>
                        </div>
                    </div>`
                    allCarts_container.appendChild(single_item);
                }
            return;
            }
        })
    } else if (role == 'learner') {
        await fetch(`${baseUrl}/cart/learner/${localLearner_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            document.querySelectorAll("#cart_number").forEach(id => id.innerHTML = (item.data.cart_item.length + item.data.cart_product.length));
            document.querySelectorAll("#cart_number-title").forEach(id => id.innerHTML = `Cart items (${item.data.cart_item.length + item.data.cart_product.length})`);
    
            if (item.success == true) {
                allCarts_container.innerHTML = '';

                if (item.data.cart_info.length == 0) {
                    allCarts_container.innerHTML = '<h4 style="padding: 10px 0px; text-align: center;">Your cart basket is empty 😟😔🙁!</h4>';
                    return;
                }

                for (let i = 0; i < 2; i++) {
                    const single_item = document.createElement("div");
                    single_item.classList.add('single_item');
                    
                    var imgurl = item.data.cart_info[i].skill_url;
                    single_item.innerHTML = `
                    <div class="cart_item_img">
                        <img src=${imgurl} alt="">
                    </div>
                    <div class="item_desc">
                        <h2 class="text">${item.data.cart_info[i].name.replace(item.data.cart_info[i].name[0], item.data.cart_info[i].name[0].toUpperCase())}</h2>
                        <p class="text">${item.data.cart_info[i].location.replace(item.data.cart_info[i].location[0], item.data.cart_info[i].location[0].toUpperCase())}</p>
                        <p class="text">${item.data.cart_info[i].period}</p>
                        <h4 class="text price">₦${item.data.cart_info[i].price}</h4>
                        <div class="cart_item_btns">
                            <button class="text">Book</button>
                            <div class="del">
                                <button id="del_btn" onclick = "deleteCart(${item.data.cart_info[i].cart_id})"><img src="assets/images/icons/delete2.png"></button>
                            </div>
                        </div>
                    </div>`
                    allCarts_container.appendChild(single_item);
                }
            return;
            }
        })
    }
}

function deleteCart(cart_id) {
    const del_btn = document.querySelectorAll("#del_btn");
    del_btn.forEach(btn => btn.addEventListener('click', async () => {
        await fetch(baseUrl+`/cart/delete/${cart_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(item => {
            // console.log(item);
            if (item.data.success == true) {
                alert('Cart item deleted successfully!!!');
                window.location.href = '';
            } else if(!item) {
                alert('Something went wrong!!!');
            }
        })
        return;
    }))
}


async function submitEmail() {
    const email = document.getElementById('subscription_emails').value;
    const errorMessage = document.getElementById('error');

    if((!email)) {
        errorMessage.innerHTML = 'Please fill in your details!';
        errorMessage.classList.add('pageerror');
        return; 
    }
    
    await fetch(baseUrl+'/subscribed-emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.data.success == true) {
            errorMessage.innerHTML = `${data.data.message}`;
            errorMessage.classList.add('valid');
        } else if (data.data.success == false) {
            errorMessage.innerHTML = `${data.data.message}`;
            errorMessage.classList.add('pageerror');
        } else {
            errorMessage.innerHTML = 'Please fill in your details!';
            errorMessage.classList.add('pageerror');
        }
    });
}


async function searchSkills() {
    const search = document.getElementById("search").value;
    console.log(search);
    localStorage.setItem("searchvalue", search);
    window.location.href = 'skills-display.html';
}

function gotoDaskboard() {
    const token = localStorage.getItem("token");
    const user_role = localStorage.getItem("user_role");
    if(token) {
        if (user_role == 'entrepreneur') {
            window.location = "entrepreneurs.html";
        } else if(user_role == 'learner') {
            window.location = "learners.html";
        } 
        else if(user_role == 'administrator') {
            window.location = "admin.html";
        }
    } else {
        window.location = "login.html";
    }
}






let currentElement = null;

function toggleContent(elementId) {
    const element = document.getElementById(`items_info${elementId}`);
    const content = element.querySelector('.inner_text_container');

    if (currentElement !== null && currentElement !== element) {
        const currentContent = currentElement.querySelector('.inner_text_container');
        currentContent.style.display = 'none';
    }

    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
        currentElement = element;
    }
}

let currentHead = null;

function toggleHeadContent(headId) {
    var content1 = document.getElementById(`article${1}`);
    var content2 = document.getElementById(`article${2}`);
    var content3 = document.getElementById(`article${3}`);
    var content4 = document.getElementById(`article${4}`);
    var content5 = document.getElementById(`article${5}`);
    // var content6 = document.getElementById(`article${6}`);
    // var content7 = document.getElementById(`article${7}`);
    // var content8 = document.getElementById(`article${8}`);
    // var content9 = document.getElementById(`article${9}`);
    
    var item1 = document.querySelector('#item1')
    var item2 = document.querySelector('#item2')
    var item3 = document.querySelector('#item3')
    var item4 = document.querySelector('#item4')
    var item5 = document.querySelector('#item5')
    // var item6 = document.querySelector('#item6')
    // var item7 = document.querySelector('#item7')
    // var item8 = document.querySelector('#item8')
    // var item9 = document.querySelector('#item9')

    var l1 = document.querySelector('#l1')
    var l2 = document.querySelector('#l2')
    var l3 = document.querySelector('#l3')
    var l4 = document.querySelector('#l4')
    var l5 = document.querySelector('#l5')
    // var l6 = document.querySelector('#l6')
    // var l7 = document.querySelector('#l7')
    // var l8 = document.querySelector('#l8')
    // var l9 = document.querySelector('#l9')
    l1 == l1 ? l1.style.display = 'block' : l1.style.display = 'none';

    if (headId === 1){
        content1.style.display = 'block';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        
        
        item1.style.color = '#0F5D85'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'

        l1.style.display = 'block'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        
    } else if (headId === 2){
        content1.style.display = 'none';
        content2.style.display = 'block';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        
        
        item1.style.color = '#001140'
        item2.style.color = '#0F5D85'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'block'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        
    } else if (headId === 3){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'block';
        content4.style.display = 'none';
        content5.style.display = 'none';
        

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#0F5D85'
        item4.style.color = '#001140'
        item5.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'block'
        l4.style.display = 'none'
        l5.style.display = 'none'
        
    } else if (headId === 4){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'block';
        content5.style.display = 'none';
        

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#0F5D85'
        item5.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'block'
        l5.style.display = 'none'
        
    } else if (headId === 5){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'block';
        

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#0F5D85'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'block'
        
    } else if (headId === 6){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        content6.style.display = 'block';
        content7.style.display = 'none';
        content8.style.display = 'none';
        content9.style.display = 'none';

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'
        item6.style.color = '#4D84FF'
        item7.style.color = '#001140'
        item8.style.color = '#001140'
        item9.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        l6.style.display = 'block'
        l7.style.display = 'none'
        l8.style.display = 'none'
        l9.style.display = 'none'
    } else if (headId === 7){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        content6.style.display = 'none';
        content7.style.display = 'block';
        content8.style.display = 'none';
        content9.style.display = 'none';

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'
        item6.style.color = '#001140'
        item7.style.color = '#4D84FF'
        item8.style.color = '#001140'
        item9.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        l6.style.display = 'none'
        l7.style.display = 'block'
        l8.style.display = 'none'
        l9.style.display = 'none'
    } else if (headId === 8){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        content6.style.display = 'none';
        content7.style.display = 'none';
        content8.style.display = 'block';
        content9.style.display = 'none';

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'
        item6.style.color = '#001140'
        item7.style.color = '#001140'
        item8.style.color = '#4D84FF'
        item9.style.color = '#001140'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        l6.style.display = 'none'
        l7.style.display = 'none'
        l8.style.display = 'block'
        l9.style.display = 'none'
    } else if (headId === 9){
        content1.style.display = 'none';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        content6.style.display = 'none';
        content7.style.display = 'none';
        content8.style.display = 'none';
        content9.style.display = 'block';

        item1.style.color = '#001140'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'
        item6.style.color = '#001140'
        item7.style.color = '#001140'
        item8.style.color = '#001140'
        item9.style.color = '#4D84FF'

        l1.style.display = 'none'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        l6.style.display = 'none'
        l7.style.display = 'none'
        l8.style.display = 'none'
        l9.style.display = 'block'
    } else {
        content1.style.display = 'block';
        content2.style.display = 'none';
        content3.style.display = 'none';
        content4.style.display = 'none';
        content5.style.display = 'none';
        

        item1.style.color = '#4D84FF'
        item2.style.color = '#001140'
        item3.style.color = '#001140'
        item4.style.color = '#001140'
        item5.style.color = '#001140'

        l1.style.display = 'block'
        l2.style.display = 'none'
        l3.style.display = 'none'
        l4.style.display = 'none'
        l5.style.display = 'none'
        
    }

    // if (content.style.display === 'block') {
    //     content.style.display = 'none'; // Hide the content
    // } else {
    //     content.style.display = 'block'; // Show the content
    // }
}


 