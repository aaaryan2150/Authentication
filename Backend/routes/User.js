
const express = require("express");
const router = express.Router();

const {Register,Login} = require("../controllers/User")

router.route("/register").post(Register)
router.route("/login").post(Login)

module.exports = router;