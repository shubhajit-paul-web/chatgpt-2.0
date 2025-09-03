import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCreateChatModelOpened: false,
	chats: [],
};

const chatModelSlice = createSlice({
	name: "chatModel",
	initialState,
	reducers: {
		openCreateChatModel: (state) => {
			state.isCreateChatModelOpened = true;
		},
		closeCreateChatModel: (state) => {
			state.isCreateChatModelOpened = false;
		},
		setChats: (state, { payload }) => {
			if (Array.isArray(payload)) {
				state.chats = payload;
			} else {
				state.chats.unshift(payload);
			}
		},
	},
});

export const { openCreateChatModel, closeCreateChatModel, setChats } = chatModelSlice.actions;
export default chatModelSlice.reducer;
