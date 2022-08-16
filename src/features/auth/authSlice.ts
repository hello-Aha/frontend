import Cookies from 'universal-cookie';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userActions } from "../user/userSlice";
import { login } from "./authAPI";

export interface AuthState {
	isAuthenticated: boolean;
	status: 'idle' | 'loading' | 'failed';
}
const initialState: AuthState = {
    isAuthenticated: false,
		status: 'idle',
}
const cookies = new Cookies()

export const loginAsync = createAsyncThunk(
	'authentication/login',
	async (data: any, thunkAPI) => {
		try {
			const response = await login(data);
			const result = await response.json();
			if(!response.ok) throw result;
			const {email, firstName, lastName, displayName, isActive, account, accessToken} = result.data;
			thunkAPI.dispatch(userActions.setUser(
				{
					email,
					firstName,
					lastName,
					displayName,
					isActive,
					account,
				}
			))
			cookies.set('accessToken', accessToken, {path:'/'});
			return result;

		} catch (error) {
				console.log(error);
				throw thunkAPI.rejectWithValue(error);
		}
	}
)

export const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			cookies.remove('accessToken', {path: '/'});
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(loginAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(loginAsync.fulfilled, (state) => {
			state.status = 'idle';
			state.isAuthenticated = true;
		})
		.addCase(loginAsync.rejected, (state) => {
			state.status = 'failed';
			state.isAuthenticated = false;
		})
		

	}
});

export const authActions = authSlice.actions;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;