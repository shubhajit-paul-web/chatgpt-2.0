const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY,
});

const chatgptProjectIndex = pc.index("chatgpt-project");

async function createMemory({ messageId, vector, metadata }) {
	await chatgptProjectIndex.upsert([
		{
			id: messageId,
			values: vector,
			metadata,
		},
	]);
}

async function queryMemory({ vector, userId, limit = 5, }) {
	const response = await chatgptProjectIndex.query({
		topK: limit,
		vector,
		filter: {
			user: userId,
		},
		includeMetadata: true,
	});

	return response.matches;
}

module.exports = {
	createMemory,
	queryMemory,
};
