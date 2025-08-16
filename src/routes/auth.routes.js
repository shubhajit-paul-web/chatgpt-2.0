const express = require("express");
const multer = require("multer");
const authControllers = require("../controllers/auth.controller");
const authValidators = require("../validators/auth.validators");

const router = express.Router();

const storage = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

router.post("/signup", storage.single("profilePicture"), authValidators.signupValidation, authControllers.signup);
router.get("/login", authValidators.loginValidation, authControllers.login);
router.get("/logout", authControllers.logout);

module.exports = router;
