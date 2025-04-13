const express = require("express");
const {signUp, signIn} = require("../controllers/authController.js")

const router = express.Router();


router.post("/auth/signUp",signUp);
router.post("/auth/signIn",signIn)

module.exports = router;