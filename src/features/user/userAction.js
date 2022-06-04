import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/baseURL';
import { LOGIN, LOGOUT, REGISTER, TOKEN, USERS_ME } from '../../constants';

export const register = createAsyncThunk(
	'user/register',
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

export const login = createAsyncThunk(
	'user/login',
	async (object, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await api.post(LOGIN, object);
			localStorage.setItem('token', data.result);
			dispatch(fetchCurrentUser());
			return { user: data.user, token: data.result };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			await api.delete(LOGOUT, {
				headers: { Authorization: localStorage.getItem(TOKEN) },
			});
			localStorage.removeItem('token');
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api(USERS_ME, {
				headers: { Authorization: localStorage.getItem(TOKEN) },
			});
			return {
				user: response.data.result,
				token: response.config.headers.Authorization,
			};
		} catch (error) {
			rejectWithValue(error.message);
		}
	}
);
