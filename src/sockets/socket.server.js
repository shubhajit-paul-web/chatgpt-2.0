const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const { createMemory, queryMemory } = require("../services/vector.service");
const User = require("../models/user.model");
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

		socket.on("ai-message", async (messagePayload) => {
			const [userMessage, userMessageVector, extractedFacts] = await Promise.all([
				Message.create({
					user: userId,
					chat: messagePayload.chat,
					content: messagePayload.content,
					role: "user",
				}),
				aiService.generateVector(messagePayload.content),
				aiService.generateResponse(`
					From the following text, extract important facts about the user (such as name, preferences, goals, interests, habits, or personality traits). Return the extracted facts in simple plain text. If no meaningful user-related information is found, return "undefined". 

					Text: ${messagePayload.content}
				`),
			]);

			if (extractedFacts !== "undefined") {
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

			const [chatHistory, memory] = await Promise.all([
				Message.find({
					chat: messagePayload.chat,
				})
					.sort({ createdAt: -1 })
					.limit(20)
					.select("content role")
					.lean(),
				queryMemory({
					vector: userMessageVector,
					userId,
					limit: 3,
				}),
			]);

			/* Short Term Memory (STM) */
			const STM = chatHistory.reverse().map((chat) => {
				return {
					role: chat.role,
					parts: [{ text: chat.content }],
				};
			});

			/* Long Term Memory (LTM) */
			const LTM = {
				role: "user",
				parts: [
					{
						text: `
						Here are my previous chats stored in long-term memory, use them to generate response:
						${memory.map((memory) => memory.metadata.text).join("\n")}
					`,
					},
				],
			};

			const responseMessage = await aiService.generateResponse([LTM, ...STM]);

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
