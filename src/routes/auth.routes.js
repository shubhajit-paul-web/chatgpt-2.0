const express = require("express");
const multer = require("multer");
const authControllers = require("../controllers/auth.controller");

const router = express.Router();

const storage = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

router.post("/signup", storage.single("profilePicture"), authControllers.signup);
router.get("/login", authControllers.login);

module.exports = router;
