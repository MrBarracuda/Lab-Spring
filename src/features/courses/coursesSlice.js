import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { COURSES_ALL } from '../../constants';
import api from '../../services/api/baseURL';

const initialState = {
	courses: [],
	isLoading: false,
	error: null,
};

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async () => {
		const response = await api.get(COURSES_ALL);
		return response.data?.result;
	}
);

export const courseSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addNewCourse: (state, { payload }) => {
			state.courses.push(payload);
		},
		deleteCourse: (state, { payload }) => {
			state.courses = state.courses.filter(({ id }) => id !== payload);
		},
	},
	extraReducers: {
		[fetchCourses.pending]: setLoading,
		[fetchCourses.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.courses = payload;
		},
		[fetchCourses.rejected]: setError,
	},
});

export const { addNewCourse, deleteCourse } = courseSlice.actions;

export const getCourses = ({ courses }) => courses.courses;

export default courseSlice.reducer;
