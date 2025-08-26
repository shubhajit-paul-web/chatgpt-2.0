const { Server } = require("socket.io");
const cookie = require("cookie");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const { createMemory, queryMemory } = require("../services/vector.service");
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
			const userMessage = await Message.create({
				user: userId,
				chat: messagePayload.chat,
				content: messagePayload.content,
				role: "user",
			});

			const userMessageVector = await aiService.generateVector(messagePayload.content);

			const extractedFacts = await aiService.generateResponse(`
								Extract key facts from the following text for long term memory storage, provide in simple and plain text, if there is no facts then return with null: ${messagePayload.content}
							`);

			console.log("Extracted Facts: ", extractedFacts);

			if (extractedFacts !== "null") {
				const extractedFactsVector = await aiService.generateVector(extractedFacts.trim());

				await createMemory({
					messageId: userMessage._id,
					vector: extractedFactsVector,
					metadata: {
						chat: messagePayload.chat,
						user: userId,
						text: extractedFacts.trim(),
					},
				});
			}

			const chatHistory = await Message.find({
				chat: messagePayload.chat,
			})
				.sort({ createdAt: -1 })
				.limit(20)
				.select("content role")
				.lean();

			/* Short Term Memory (STM) */
			const STM = chatHistory.reverse().map((chat) => {
				return {
					role: chat.role,
					parts: [{ text: chat.content }],
				};
			});

			/* Long Term Memory (LTM) */
			const LTM = await queryMemory({
				vector: userMessageVector,
				userId,
				limit: 1,
			});

			STM[STM.length - 1].parts[0].text += `
				These are my previous chat's data stored inside long term memory:
				${LTM.map((memory) => memory.metadata.text).join("\n")}
			`;

			const responseMessage = await aiService.generateResponse(STM);

			await Message.create({
				user: userId,
				chat: messagePayload.chat,
				content: responseMessage,
				role: "model",
			});

			socket.emit("ai-response", {
				chat: messagePayload.chat,
				content: responseMessage,
			});
		});

		socket.on("disconnect", () => {
			console.log("User is disconnected from socket.io");
		});
	});
}

module.exports = initSocketServer;
