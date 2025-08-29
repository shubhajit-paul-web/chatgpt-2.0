const { body } = require("express-validator");

/* Signup validations */
const signupValidation = [
	body("email")
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Please provide a valid email id")
		.trim(),
	body("fullName")
		.notEmpty().withMessage("Full name is required")
		.trim(),
	body("password")
		.notEmpty().withMessage("Password is required")
		.isStrongPassword().withMessage("Password must be at least 8 chars long and include uppercase, lowercase, number, and symbol")
		.trim(),
];

/* Login validations */
const loginValidation = [
    body("email")
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Please provide a valid email id")
		.trim(),
    body("password")
		.notEmpty().withMessage("Password is required")
		.trim(),
];

module.exports = {
	signupValidation,
    loginValidation,
};
