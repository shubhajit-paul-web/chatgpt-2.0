import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSending: false,
	messages: [],
};

const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
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

export const { messageSending, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
