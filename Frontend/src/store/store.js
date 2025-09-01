import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import chatModelSlice from "../features/chatModel/chatModelSlice";

export const store = configureStore({
	reducer: {
		authReducer: authSlice,
		chatModelReducer: chatModelSlice,
	},
});
