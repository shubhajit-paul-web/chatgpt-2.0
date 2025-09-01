const Message = require("../models/message.model");

/**
 * GET /api/v1/messages
 * Query Params: chatId
 */

async function getMessages(req, res) {
	const userId = req.user._id;
	const { chatId } = req.query;

	const messages = await Message.find({
		user: userId,
		chat: chatId,
	})
		.select("_id content role createdAt")
		.lean();

	res.status(200).json(messages);
}

module.exports = { getMessages };
