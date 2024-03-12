    TO REGISTER A USER
http://localhost:8888/api/v1/auth/

    TO LOGIN ROUTE (POST)
http://localhost:8888/api/v1/auth/login



                    SKILLS ENDPOINTS
    TO GET ALL SKILLS (GET)
http://localhost:8888/api/v1/skills

    TO GET DISTINCT SKILLS (GET)
http://localhost:8888/api/v1/skills/distinct

    TO GET A PARTICULAR SKILL (GET)
http://localhost:8888/api/v1/skills/:name

    TO GET A PARTICULAR SKILL WITH THE ENTREPRENEURS INFO (GET)
http://localhost:8888/api/v1/skills/one-skill/:skill_id

    TO GET A PARTICULAR ENTREPRENEURS SKILL (GET)
http://localhost:8888/api/v1/skills/entreprenuer/:entreprenuer_id

    TO ADD SKILLS (POST)
http://localhost:8888/api/v1/skills/:entreprenuer_id

    TO PATCH SKILLS (PATCH)
http://localhost:8888/api/v1/skills/update/:entreprenuer_id

    TO DELETE A SKILL (DELETE)
http://localhost:8888/api/v1/skills/delete/:entreprenuer_id



                    PRODUCTS ENDPOINTS
    TO GET ALL PRODUCTS (GET)
http://localhost:8888/api/v1/products

    TO GET DISTINCT PRODUCTS (GET)
http://localhost:8888/api/v1/products/distinct

    TO GET A PARTICULAR PRODUCTS (GET)
http://localhost:8888/api/v1/products/:name

    TO GET A PARTICULAR PRODUCTS WITH THE USERS INFO (GET)
http://localhost:8888/api/v1/products/one-product/:product_id

    TO GET A PARTICULAR USER PRODUCTS (GET)
http://localhost:8888/api/v1/products/user/:user_id

    TO ADD products (POST)
http://localhost:8888/api/v1/products/:user_id

    TO PATCH products (PATCH)
http://localhost:8888/api/v1/products/update/:user_id

    TO DELETE A PRODUCT (DELETE)
http://localhost:8888/api/v1/products/delete/:user_id



                    CART ENDPOINTS
    TO ADD ITEMS TO CART (POST)
http://localhost:8888/api/v1/cart

    TO VIEW AN ENTREPRENEURS CART ITEMS (GET)
http://localhost:8888/api/v1/cart/entreprenuer/:entreprenuer_id

    TO VIEW AN LEARNERS CART ITEMS (GET)
http://localhost:8888/api/v1/cart/learner/:learner_id

    TO DELETE A CART ITEM (DELETE)
http://localhost:8888/api/v1/cart/delete/:cart_id



                    CHANGE PASSWORD ENDPOINTS
    GET A PARTICULAR USERS OLDPASSWORD BY NAME (POST)
http://localhost:8888/api/v1/auth/oldpassword/:email

    PATCH/UPDATE A PARTICULAR USERS PASSWORD BY NAME (PATCH)
http://localhost:8888/api/v1/auth/password-change/:email



                    LEARNERS ENDPOINTS
    TO GET ALL LEARNERS (GET)
http://localhost:8888/api/v1/learners/

    TO GET ALL LEARNERS (GET)
http://localhost:8888/api/v1/learners/:email

    TO ADD A NEW LEARNERS (POST)
http://localhost:8888/api/v1/learners/:email

    TO ADD A NEW LEARNERS (PATCH)
http://localhost:8888/api/v1/learners/update/:user_id

    TO ADD A NEW LEARNERS (DELETE)
http://localhost:8888/api/v1/learners/delete/:user_id





                    CHAT ENDPOINTS
    TO GET A CONVERSATION
http://localhost:8888/api/v1/chat/:chat_id

    SEND MESSAGE LEARNER TO ENTREPRENEURS
http://localhost:8888/api/v1/chat/:sender_id/send-to=:entreprenuer_id

    SEND MESSAGE ENTREPRENEURS TO LEARNER
http://localhost:8888/api/v1/chat/:sender_id/receipient=:learner_id