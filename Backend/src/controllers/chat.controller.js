const Chat = require("../models/chat.model");
const { validationResult } = require("express-validator");

/**
 * POST /api/v1/chat
 * Body: { title }
 */
async function createChat(req, res) {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		return res.status(400).json({
			errors: validationErrors.array(),
		});
	}

	const user = req.user;
	const title = req.body?.title;

	try {
		const createdChat = await Chat.create({
			user: user._id,
			title,
		});

		if (createdChat) {
			res.status(201).json({
				message: "Chat created successfully",
				chat: {
					_id: createdChat._id,
					user: createdChat.user,
					title: createdChat.title,
					lastActivity: createdChat.lastActivity,
				},
			});
		}
	} catch (error) {
		console.error("createChat controller error:", error.message);
		res.status(500).json({
			message: "An error occurred during create chat",
		});
	}
}

/**
 * GET /api/v1/chat
 */
async function getChats(req, res) {
	const userId = req.user._id;

	const allChats = await Chat.find({
		user: userId,
	})
		.select("_id title createdAt")
		.lean();

	res.status(200).json(allChats);
}

module.exports = { createChat, getChats };
