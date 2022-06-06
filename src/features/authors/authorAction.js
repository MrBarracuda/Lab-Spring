import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/baseURL';
import { AUTHORS_ADD, AUTHORS_ALL } from '../../constants';
import { getToken } from '../helpers/handleRequests';

export const getAllAuthors = createAsyncThunk(
	'authors/getAllAuthors',
	async () => {
		const { data } = await api(AUTHORS_ALL);
		return data?.result;
	}
);

export const createNewAuthor = createAsyncThunk(
	'authors/createNewAuthor',
	async (author) => {
		const { data } = await api.post(AUTHORS_ADD, author, {
			headers: { Authorization: getToken() },
		});
		return data?.result;
	}
);
// {
// 	data: author,
// 		headers: { Authorization: localStorage.getItem(TOKEN) },
// }
