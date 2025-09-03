import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSocketConnected: false,
	isSending: false,
	messages: [],
};

const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setIsSocketConnected: (state, { payload }) => {
			state.isSocketConnected = payload;
		},
		messageSending: (state, { payload }) => {
			state.isSending = payload;
		},
		setMessages: (state, { payload }) => {
			if (Array.isArray(payload)) {
				state.messages = payload;
			} else {
				state.messages.push(payload);
			}
		},
	},
});

export const { setIsSocketConnected, messageSending, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
