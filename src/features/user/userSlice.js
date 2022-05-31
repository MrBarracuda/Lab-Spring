import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { REGISTER, LOGIN, LOGOUT } from '../../constants';
import api from '../../services/api/baseURL';

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (object, { rejectWithValue }) => {
		try {
			const {
				data: { successful },
			} = await api.post(REGISTER, object);
			return successful;
		} catch (error) {
			console.log(error.message);
			return rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk('user/loginUser', async (object) => {
	const { data } = await api.post(LOGIN, object);
	localStorage.setItem('token', data.result);
	localStorage.setItem('userName', data.user.name);
	return data;
});

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (object, { rejectWithValue }) => {
		try {
			const response = await api.delete(LOGOUT, object?.id);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	name: '',
	email: '',
	token: '',
	role: '',
	isAuth: false,
	isLoading: false,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		// register
		[registerUser.pending]: setLoading,
		[registerUser.fulfilled]: (state) => {
			state.isLoading = false;
			state.error = null;
		},
		[registerUser.rejected]: setError,

		// login
		[loginUser.pending]: setLoading,
		[loginUser.fulfilled]: (state, { payload }) => {
			state.isAuth = true;
			state.name = payload.user.name;
			state.email = payload.user.email;
			state.token = payload.result;
			state.isLoading = false;
			state.error = null;
		},
		[loginUser.rejected]: setError,

		// logout
		[logoutUser.fulfilled]: () => initialState,
		[logoutUser.rejected]: setError,
	},
	//	//TODO fix promleb when user just logged in and he can't see logout button and his name upon refreshing page
});

export const { register } = userSlice.actions;

export const getUser = ({ user }) => user;

export default userSlice.reducer;
