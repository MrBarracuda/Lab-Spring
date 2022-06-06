import { createSlice } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { getAllAuthors, createNewAuthor } from './authorAction';

const initialState = {
	authors: [],
	isLoading: false,
	error: null,
};

export const authorSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: {
		//get authors array
		[getAllAuthors.pending]: setLoading,
		[getAllAuthors.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.authors = payload;
		},
		[getAllAuthors.rejected]: setError,

		//push new author to array
		[createNewAuthor.pending]: setLoading,
		[createNewAuthor.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.authors.push(payload);
		},
		[createNewAuthor.rejected]: setError,
	},
});

export const { addNewAuthor } = authorSlice.actions;

export const getAuthors = ({ authors }) => authors.authors;

export default authorSlice.reducer;
