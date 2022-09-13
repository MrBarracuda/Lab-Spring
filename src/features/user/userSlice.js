import { createSlice } from '@reduxjs/toolkit';
import { register, logout, login, fetchCurrentUser } from './userAction';
import { setError, setLoading, userResolved } from '../helpers/handleRequests';

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
	extraReducers: {
		// register
		[register.pending]: setLoading,
		[register.fulfilled]: (state) => {
			state.isLoading = false;
			state.error = null;
		},
		[register.rejected]: setError,

		// login
		[login.pending]: setLoading,
		[login.fulfilled]: userResolved,
		[login.rejected]: setError,

		// logout
		[logout.pending]: setLoading,
		[logout.fulfilled]: () => initialState,
		[logout.rejected]: setError,

		// fetch current user
		[fetchCurrentUser.pending]: setLoading,
		[fetchCurrentUser.fulfilled]: userResolved,
		[fetchCurrentUser.rejected]: setError,
	},
});

export const getUser = ({ user }) => user;

export default userSlice.reducer;
