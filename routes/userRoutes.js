const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Hello World! from the userRoutes.js file  ");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify", authController.protect, authController.verifyToken);
module.exports = router;
