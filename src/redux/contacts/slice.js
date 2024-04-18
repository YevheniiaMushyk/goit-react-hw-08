import { createSlice } from "@reduxjs/toolkit";
import { apiGetUserContacts, apiAddUserContact, apiDeleteUserContact } from "./operations";

const handlePending = (state) => {
	state.isLoading = true;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		items: [],
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(apiGetUserContacts.pending, handlePending)
			.addCase(apiGetUserContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(apiGetUserContacts.rejected, handleRejected)
			.addCase(apiAddUserContact.pending, handlePending)
			.addCase(apiAddUserContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items.push(action.payload);
			})
			.addCase(apiAddUserContact.rejected, handleRejected)
			.addCase(apiDeleteUserContact.pending, handlePending)
			.addCase(apiDeleteUserContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const index = state.items.findIndex((contact) => contact.id === action.payload.id);
				state.items.splice(index, 1);
			})
			.addCase(apiDeleteUserContact.rejected, handleRejected);
	},
});

export const contactReducer = contactsSlice.reducer;
