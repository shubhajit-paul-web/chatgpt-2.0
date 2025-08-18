const { Server } = require("socket.io");
const cookie = require("cookie");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const generateContent = require("../services/ai.service");

function initSocketServer(httpServer) {
	const io = new Server(httpServer);

	// Middleware - Auth user
	io.use(async (socket, next) => {
		const cookies = cookie.parse(socket.handshake.headers?.cookie ?? "");
		const token = cookies.token;

		if (!token) {
			next(new Error("Authentication error: No token provided"));
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findById(decoded.id).select("-password -__v").lean();

			if (!user) {
				next(new Error("Authentication error: User not found, login again"));
			}

			socket.user = user;
			next();
		} catch (error) {
			next(new Error("Authentication error: Invalid token"));
		}
	});

	io.on("connection", (socket) => {
		console.log("New socket connection:", socket.id);

		socket.on("ai-message", async (data) => {
			const response = await generateContent(data);

			socket.emit("ai-response", response);
		});

		socket.on("disconnect", () => {
			console.log("User is disconnected from socket.io");
		});
	});
}

module.exports = initSocketServer;
