const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");
const chatValidators = require("../validators/chat.validator");

const router = express.Router();

router.post("/", authMiddleware.authUser, chatValidators.createChatValidation, chatController.createChat);

module.exports = router;
