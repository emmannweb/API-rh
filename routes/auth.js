const express = require("express");
const router = express.Router();

const { signup, signin, logout, userProfile } = require("../controllers/auth")
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post("/register", signup);
router.post("/login", signin);
router.get("/logout", logout);
router.get("/me", isAuthenticated, userProfile);




module.exports = router; 