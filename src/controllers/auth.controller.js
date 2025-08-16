const User = require("../models/user.model");
const uploadFile = require("../services/storage.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* Signup controller (POST) */
async function signup(req, res) {
	const profilePicture = req.file;
	const { email, fullName, password } = req.body;

	try {
		const isExistingEmail = await User.findOne({
			email: email,
		});

		if (isExistingEmail) {
			return res.status(409).json({
				message: "This email is already in use",
			});
		}

		const uploadedProfilePicture = await uploadFile(profilePicture);
		const hashedPassword = await bcrypt.hash(password, 10);

		const createdUser = await User.create({
			profilePicture: uploadedProfilePicture.url,
			email,
			fullName,
			password: hashedPassword,
		});

		if (createdUser) {
			const token = jwt.sign(
				{
					id: createdUser._id,
				},
				process.env.JWT_SECRET
			);

			res.cookie("token", token, {
				httpOnly: true,
			});
			res.status(201).json({
				message: "Signup successful",
				user: {
					profilePicture: createdUser.profilePicture,
					email: createdUser.email,
					fullName: createdUser.fullName,
				},
			});
		}
	} catch (error) {
		res.status(400).json({
			message: "An error occurred during signup",
			error: error.message,
		});
	}
}

/* Login controller (GET) */
async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			email: email,
		})?.lean();

		if (!user) {
			return res.status(401).json({
				message: "Invalid email address",
			});
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET
		);

		res.cookie("token", token, {
			httpOnly: true,
		});
		res.status(200).json({
			message: "Logged in successfully",
			user: {
				profilePicture: user.profilePicture,
				email: user.email,
				fullName: user.fullName,
			},
		});
	} catch (error) {
		res.status(400).json({
			message: "An error occurred during login",
			error: error.message,
		});
	}
}

/* Logout controller (GET) */
async function logout(req, res) {
	res.clearCookie("token");
	res.status(200).json({
		message: "Logged out successfully",
	});
}

module.exports = { signup, login, logout };
