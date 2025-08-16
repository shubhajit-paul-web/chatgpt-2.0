const Chat = require("../models/chat.model");

/* Create Chat (POST) */
async function createChat(req, res) {
    const user = req.user;
	const { title } = req.body;

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
		console.error(error);
		res.status(500).json({
			message: "An error occurred during create chat",
		});
	}
}

module.exports = { createChat };
