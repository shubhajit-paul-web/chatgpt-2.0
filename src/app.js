const express = require("express");
const cookieParser = require("cookie-parser");

/* Routes */
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Using routes */
app.use("/api/v1/auth", authRoutes);

module.exports = app;
