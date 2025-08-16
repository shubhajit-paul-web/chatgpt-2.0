const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		profilePicture: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
            unique: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
