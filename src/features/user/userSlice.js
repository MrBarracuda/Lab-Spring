import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { REGISTER, LOGIN, LOGOUT, AUTH_TOKEN, USERS_ME } from '../../constants';
import api from '../../services/api/baseURL';

const userResolved = (state, { payload }) => {
	state.email = payload.user.email;
	state.name = payload.user.name;
	state.role = payload.user.role || 'user';
	state.token = payload.token;
	state.isAuth = true;
	state.isLoading = false;
	state.error = null;
};

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

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (object, { rejectWithValue }) => {
		try {
			const { data } = await api.post(LOGIN, object);
			localStorage.setItem('token', data.result);
			return { user: data.user, token: data.result };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			await api.delete(LOGOUT, { headers: AUTH_TOKEN });
			localStorage.removeItem('token');
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async () => {
		const response = await api(USERS_ME, { headers: AUTH_TOKEN });
		return {
			user: response.data.result,
			token: response.config.headers.Authorization,
		};
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
	reducers: {
		logout: () => initialState,
	},
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
		[loginUser.fulfilled]: userResolved,
		[loginUser.rejected]: setError,

		// logout
		[logoutUser.pending]: setLoading,
		// [logoutUser.fulfilled]: () => initialState,
		[logoutUser.rejected]: setError,

		// fetch current user
		[fetchCurrentUser.pending]: setLoading,
		[fetchCurrentUser.fulfilled]: userResolved,
		[fetchCurrentUser.rejected]: setError,
	},
});

export const { register, logout } = userSlice.actions;

export const getUser = ({ user }) => user;

export default userSlice.reducer;
