const { body } = require("express-validator");

/* Create chat validations */
const createChatValidation = [
    body("title")
        .notEmpty().withMessage("Chat title is required")
        .trim(),
];

module.exports = {
    createChatValidation,
}