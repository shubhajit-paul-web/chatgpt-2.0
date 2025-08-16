require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Start the server
(async () => {
	try {
		await connectDB();
		initSocketServer(httpServer);

		httpServer.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Faild to start the server:", error.message);
		process.exit(1);
	}
})();
