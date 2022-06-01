import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { AUTHORS_ADD, AUTHORS_ALL } from '../../constants';
import api from '../../services/api/baseURL';

const initialState = {
	authors: [],
	isLoading: false,
	error: null,
};

export const fetchAuthors = createAsyncThunk(
	'authors/fetchAuthors',
	async () => {
		const { data } = await api(AUTHORS_ALL);
		return data?.result;
	}
);

export const sendAuthor = createAsyncThunk(
	'authors/sendAuthor',
	async (author, { dispatch }) => {
		const response = await api.post(AUTHORS_ADD, author);
		console.log(response);
		return response;
	}
);

export const authorSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		addNewAuthor: (state, { payload }) => {
			state.authors.push(payload);
		},
	},
	extraReducers: {
		//get authors array
		[fetchAuthors.pending]: setLoading,
		[fetchAuthors.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.authors = payload;
		},
		[fetchAuthors.rejected]: setError,

		//push new author to array
		[sendAuthor.pending]: setLoading,
		[sendAuthor.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.authors.push(payload);
		},
		[sendAuthor.rejected]: setError,
	},
});

export const { addNewAuthor } = authorSlice.actions;

export const getAuthors = ({ authors }) => authors.authors;

export default authorSlice.reducer;
