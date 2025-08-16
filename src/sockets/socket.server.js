const { Server } = require("socket.io");

function initSocketServer(httpServer) {
	const io = new Server(httpServer);

	io.on("connection", (socket) => {
		console.log("New socket connection:", socket.id);

		socket.on("disconnect", () => {
			console.log("User is disconnected from socket.io");
		});
	});
}

module.exports = initSocketServer;
