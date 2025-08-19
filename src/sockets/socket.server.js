const { Server } = require("socket.io");
const cookie = require("cookie");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const Message = require("../models/message.model");

function initSocketServer(httpServer) {
	const io = new Server(httpServer);

	/* Middleware - Authenticate user */
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

	io.on("connection", async (socket) => {
		const userId = socket.user._id;
		console.log("New socket connection:", socket.id);

		socket.on("ai-message", async (messagePayload) => {
			await Message.create({
				user: userId,
				chat: messagePayload.chat,
				content: messagePayload.content,
				role: "user",
			});

			const chatHistory = await Message.find({
				chat: messagePayload.chat,
			})
				.sort({ createdAt: -1 })
				.limit(20)
				.select("content role")
				.lean();

			const contents = chatHistory.reverse().map((chat) => {
				return {
					role: chat.role,
					parts: [{ text: chat.content }],
				};
			});

			const response = await aiService.generateResponse(contents);

			await Message.create({
				user: userId,
				chat: messagePayload.chat,
				content: response,
				role: "model",
			});

			socket.emit("ai-response", {
				chat: messagePayload.chat,
				content: response,
			});
		});

		socket.on("disconnect", () => {
			console.log("User is disconnected from socket.io");
		});
	});
}

module.exports = initSocketServer;
