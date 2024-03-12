const express = require("express");
const router = express.Router();
const { getallUser, getallCustomers, getAllUserCustomers, getUser, getUserByAny, getUserByAdmin, registerUser, AddCustomerInfo, UpdateCustomerInfo, DeleteCustomerInfo, deleteUser, checkoldPassword, patchBuyerPassword, getUserById, getUserByName, checkTestDB} = require("../../controllers/auth/register");

router.get("/users", getallUser);

router.get("/customers", getallCustomers);

router.get("/customers/:userid", getAllUserCustomers);

router.get("/users/email/:email", getUser);

router.get("/users/id/:customerid/:userid", getUserById);

router.get("/users/name/:name", getUserByName);

router.get("/users/any/:anysearch/:userid", getUserByAny);

router.get("/users/any/admin", getUserByAdmin);

router.post("/register", registerUser);

router.post("/add-customer/:userid", AddCustomerInfo);

router.put("/update-customer/:customerid/:userid", UpdateCustomerInfo);

router.delete("/delete-customer/:customerid/:userid", DeleteCustomerInfo);

router.delete("/delete-account/:email", deleteUser);



router.post("/oldpassword/:email", checkoldPassword);

router.patch("/password-change/:email", patchBuyerPassword);

router.get("/testdb", checkTestDB);


module.exports = router;
