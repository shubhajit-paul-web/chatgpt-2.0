const ImageKit = require("imagekit");
const { v4: uuidv4 } = require("uuid");

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

async function uploadFile(file) {
	const response = await imagekit.upload({
		file: file.buffer,
		fileName: uuidv4(),
		folder: "chatgpt-2/profile-pictures",
		isPublished: true,
	});

	return response;
}

module.exports = uploadFile;
