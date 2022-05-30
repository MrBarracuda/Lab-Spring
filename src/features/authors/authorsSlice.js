import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api/baseURL';
import { AUTHORS_ALL } from '../../constants';

const initialState = {
	authors: [],
	isLoading: true,
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
		addNewAuthor: (state, { payload }) => ({
			...state,
			authors: [...state.authors, payload],
		}),
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAuthors.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchAuthors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.authors = payload;
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { addNewAuthor } = authorSlice.actions;

export const getAuthors = ({ authors }) => authors.authors;

export default authorSlice.reducer;
