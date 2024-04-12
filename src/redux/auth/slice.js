import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiLoginUser, apiLogoutUser, apiRefreshUser, apiRegisterUser } from "./operations";

const INITIAL_STATE = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
	isError: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: INITIAL_STATE,
	extraReducers: (builder) =>
		builder
			.addCase(apiRegisterUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.userData = action.payload.user;
				state.token = action.payload.token;
				state.isSignedIn = true;
			})
			.addCase(apiLoginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.userData = action.payload.user;
				state.token = action.payload.token;
				state.isSignedIn = true;
			})
			.addCase(apiLogoutUser.fulfilled, () => {
				return INITIAL_STATE;
			})

			//   REFRESH
			.addCase(apiRefreshUser.pending, (state) => {
				state.isRefreshing = true;
				state.isError = false;
			})
			.addCase(apiRefreshUser.fulfilled, (state, action) => {
				state.isRefreshing = false;
				state.userData = action.payload;
				state.isSignedIn = true;
			})
			.addCase(apiRefreshUser.rejected, (state) => {
				state.isRefreshing = false;
				state.isError = true;
			})

			.addMatcher(isAnyOf(apiRegisterUser.pending, apiLoginUser.pending, apiLogoutUser.pending), (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addMatcher(isAnyOf(apiRegisterUser.rejected, apiLoginUser.rejected, apiLogoutUser.rejected), (state) => {
				state.isLoading = false;
				state.isError = true;
			}),
});

export const authReducer = authSlice.reducer;
