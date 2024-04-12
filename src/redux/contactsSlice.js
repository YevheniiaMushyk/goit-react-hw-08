import { createSlice } from "@reduxjs/toolkit";
import { addContact, fetchContacts, deleteContact } from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import { selectContacts, selectFilterName } from "./selectors";

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
			.addCase(fetchContacts.pending, handlePending)
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, handleRejected)
			.addCase(addContact.pending, handlePending)
			.addCase(addContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, handleRejected)
			.addCase(deleteContact.pending, handlePending)
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const index = state.items.findIndex((contact) => contact.id === action.payload.id);
				state.items.splice(index, 1);
			})
			.addCase(deleteContact.rejected, handleRejected);
	},
});

export const selectFilteredContacts = createSelector([selectContacts, selectFilterName], (сontacts, valueFilter) => {
	if (Array.isArray(сontacts)) {
		return сontacts.filter((contact) => contact.name.toLowerCase().includes(valueFilter.toLowerCase()));
	} else {
		return [];
	}
});

export const contactReducer = contactsSlice.reducer;
