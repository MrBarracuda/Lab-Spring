import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { AUTHORS_ALL } from '../../constants';
import api from '../../services/api/baseURL';

const initialState = {
	authors: [],
	isLoading: false,
	error: null,
};

export const fetchAuthors = createAsyncThunk(
	'authors/fetchAuthors',
	async () => {
		const response = await api.get(AUTHORS_ALL);
		return response.data?.result;
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
		[fetchAuthors.pending]: setLoading,
		[fetchAuthors.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.authors = payload;
		},
		[fetchAuthors.rejected]: setError,
	},
});

export const { addNewAuthor } = authorSlice.actions;

export const getAuthors = ({ authors }) => authors.authors;

export default authorSlice.reducer;
