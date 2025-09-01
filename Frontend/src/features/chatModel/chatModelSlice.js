import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCreateChatModelOpened: false,
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
	},
});

export const { openCreateChatModel, closeCreateChatModel } = chatModelSlice.actions;
export default chatModelSlice.reducer;
