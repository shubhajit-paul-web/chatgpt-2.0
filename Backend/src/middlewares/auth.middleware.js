const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
	const { token } = req.cookies;

	if (!token) {
		return res.status(401).json({
			message: "No authentication token provided",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id).select("-password -__v").lean();

		if (!user) {
			return res.status(401).json({
				message: "Unauthorized: user not found",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				message: "Token expired. Please log in again",
			});
		}
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				message: "Invalid token",
			});
		}

		console.error("Auth error:", error);
		res.status(401).json({
			message: "Authentication failed",
		});
	}
}

module.exports = { authUser };
