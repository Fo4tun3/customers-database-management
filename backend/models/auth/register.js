const db = require("../../db");

exports.getAllUsers = async () => {
    try {
        const user = await db.query("SELECT * FROM users");
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getAllCustomers = async (user_id) => {
    try {
        const user = await db.query("SELECT * FROM customers_info");
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getAllUserCustomers = async (user_id) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE user_id=?", user_id);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUser = async (email) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE email LIKE ?", ['%'+email+'%']);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserById = async (customerid, userid) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE customer_id=? AND user_id=?", [customerid, userid]);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserByName = async (name) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE name LIKE ?", ['%'+name+'%']);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserByAny = async (name, id) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE name LIKE ? OR customer_id = ? OR email LIKE ? AND user_id=?", ['%'+name+'%',name,'%'+name+'%', id]);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.getOneUserByAdmin = async (name) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE name LIKE ? OR customer_id = ? OR email LIKE ?", ['%'+name+'%',name,'%'+name+'%']);
        console.log(user);
        return user[0]
    } catch (err) {
        return err;
    }
}

exports.addUser = async (data) => {
    try {
        const checkemail = await db.query("SELECT email FROM users WHERE email=?", [data[1]]);
        if (checkemail[0].length > 0) {
            return {success: false, message: "email already exists"};
        } else {
            const user = await db.query("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", data);
            return {success: true, message: 'User added successfully'};
        }
    } catch (err) {
        return err;
    }
}

exports.addCustomer = async (data) => {
    try {
        const checkemail = await db.query("SELECT email FROM users WHERE email=?", [data[1]]);
        if (checkemail[0].length > 0) {
            return {success: false, message: "email already exists"};
        } else {
            const user = await db.query("INSERT INTO `customers_info` (`name`, `email`, `contact`, `city`, `country`, `gender`, `date`, user_id) VALUES (?, ?, ?, ?, ?, ?, current_timestamp(), ?)", data);
            return {success: true, message: 'User added successfully'};
        }
    } catch (err) {
        return err;
    }
}

exports.UpdateCustomer = async (data) => {
    try {
        const user = await db.query("UPDATE customers_info SET name=?, email=?, contact=?, city=?, country=?, gender=? WHERE customer_id=? AND user_id=?", data);
        // console.log(user[0]);
        if (user[0].affectedRows == 0) {
            return {success: false, message: 'User does not exist!'};
        } else {
            return {success: true, message: 'User updated successfully'};
        }
    } catch (err) {
        return err;
    }
}

exports.DeleteCustomer = async (data) => {
    try {
        const user = await db.query("DELETE FROM customers_info WHERE customer_id=? AND user_id=?", data);
        if (user[0].affectedRows == 0) {
            return {success: false, message: 'User not deleted'};
        } else {
            return {success: true, message: 'User deleted successfully'};
        }
    } catch (err) {
        return err;
    }
}

exports.deactivateUser = async (email) => {
    try {
        const user = await db.query("UPDATE customers_info SET status=1 WHERE email = $1 RETURNING *", [email]);
        if (user[0].length === 0) {
            return {success: false, message: "User does not exists!!"}
        }
        return {success: true, message: "User Deleted Successfully!!", data: user[0]};
    } catch (err) {
        return err;
    }
}

exports.checkoldPassword = async (email) => {
    try {
        const user = await db.query("SELECT * FROM customers_info WHERE email = $1", [email]);

        if (user[0].length === 0) {
            return res.status(404).send("User not found!")
        }
        return user[0];
    } catch (err) {
        return err;
    }
}

exports.patchBuyerPassword = async (data) => {
    try {
        const passwordUpdate = await db.query("UPDATE customers_info SET password=$1 WHERE email = $2 RETURNING *", data);
        if (passwordUpdate[0].length === 0) {
            return res.status(404).send("User not found!");
        }
        return ({success: true, message: "Password Updated Successfully!!", passwordData: passwordUpdate[0]});
    } catch (err) {
        return err;
    }
}

exports.checkTestDB = async (data) => {
    try {
        const admin = await db.query("SELECT * FROM customers_info");
        
        if (admin[0].length === 0) {
            return {message: 'User does not Exists!', message: "Invalid Email" };
        } else {  
            return {message: 'User Exists!', data: admin[0]};
        }            
    } catch (err) {
        return err;
    }
}