const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();

/* Using middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

/* Using routes */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);

module.exports = app;
