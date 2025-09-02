import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import chatModelSlice from "../features/chatModel/chatModelSlice";
import messagesSlice from "../features/messages/messagesSlice";

export const store = configureStore({
	reducer: {
		authReducer: authSlice,
		chatModelReducer: chatModelSlice,
		messagesReducer: messagesSlice,
	},
});
