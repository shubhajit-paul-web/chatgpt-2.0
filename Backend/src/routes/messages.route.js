const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const messagesController = require("../controllers/messages.controller");

const router = express.Router();

router.get("/", authMiddleware.authUser, messagesController.getMessages);

module.exports = router;
