import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSending: false,
};

const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		messageSending: (state) => {
			state.isSending = true;
		},
	},
});

export const { messageSending } = messagesSlice.actions;
export default messagesSlice.reducer;
