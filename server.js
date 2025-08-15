require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// Start the server
(async () => {
	const PORT = process.env.PORT || 8000;

	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Faild to start the server:", error.message);
		process.exit(1);
	}
})();
