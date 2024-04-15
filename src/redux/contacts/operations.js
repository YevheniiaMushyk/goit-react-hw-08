import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestGetContacts, requestAddContact, requestDeleteContact } from "./services";

axios.defaults.baseURL = "https://660f820f356b87a55c51852b.mockapi.io/";

// GET @ /contacts
export const apiGetUserContacts = createAsyncThunk("phonebook/get", async (_, thunkAPI) => {
	try {
		const data = await requestGetContacts();
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

// POST @ /contacts
export const apiAddUserContact = createAsyncThunk("phonebook/add", async (formData, thunkAPI) => {
	try {
		const data = await requestAddContact(formData);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

// DELETE @ /contacts/:id
export const apiDeleteUserContact = createAsyncThunk("phonebook/delete", async (contactId, thunkAPI) => {
	try {
		const data = await requestDeleteContact(contactId);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});
