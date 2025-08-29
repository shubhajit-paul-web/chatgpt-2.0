const mongoose = require("mongoose");

async function connectDB() {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}/chatgpt-project`);
		console.log("MongoDB is connected");
	} catch (error) {
		console.error("MongoDB connection Error:", error.message);
		process.exit(1);
	}
}

module.exports = connectDB;
