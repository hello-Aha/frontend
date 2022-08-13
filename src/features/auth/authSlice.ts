import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
	isAuthenticated: boolean;
}
const initialState: AuthState = {
    isAuthenticated: true,
}
export const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authSlice.actions;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;