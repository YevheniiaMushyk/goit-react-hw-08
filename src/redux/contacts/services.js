import axios from "axios";

const instance = axios.create({
	baseURL: "https://connections-api.herokuapp.com",
});

export const requestGetContacts = async () => {
	const { data } = await instance.get("/contacts");
	return data;
};

export const requestAddContact = async (formData) => {
	const { data } = await instance.post("/contacts", formData);
	return data;
};

export const requestDeleteContact = async (contactId) => {
	const { data } = await instance.delete(`/contacts/${contactId}`);
	return data;
};
