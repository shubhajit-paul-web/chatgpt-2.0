const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");
const chatValidators = require("../validators/chat.validator");

const router = express.Router();

router.use(authMiddleware.authUser);

router.route("/")
    .post(chatValidators.createChatValidation, chatController.createChat)
    .get(chatController.getChats)

module.exports = router;
