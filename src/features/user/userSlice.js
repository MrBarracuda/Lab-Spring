import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api/baseURL';
import { REGISTER, LOGIN } from '../../constants';

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (object) => {
		const { data } = await api.post(REGISTER, object);
		return data.successful;
	}
);

export const loginUser = createAsyncThunk('user/loginUser', async (object) => {
	const { data } = await api.post(LOGIN, object);
	localStorage.setItem('token', data.result);
	localStorage.setItem('userName', data.user.name);
	return data;
});

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		register: (state, { payload }) => ({
			...state,
			name: payload.name,
			email: payload.email,
		}),
		// login: (state, { payload }) => ({
		// 	...state,
		// 	isAuth: true,
		// 	token: payload.token,
		// }),
		logout: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, { payload }) => ({
				...state,
			}))
			.addCase(loginUser.fulfilled, (state, { payload }) => ({
				isAuth: true,
				name: payload.user.name,
				email: payload.user.email,
				token: payload.result,
			}));
	},
});

export const { register, login, logout } = userSlice.actions;

export const getUser = ({ user }) => user.user;

export default userSlice.reducer;
