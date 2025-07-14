// login route using async function
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller.js");
// route for login
router.post("/login", loginController.login);
// export the router
module.exports = router;
