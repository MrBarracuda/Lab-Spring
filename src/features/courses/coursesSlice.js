import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import { AUTH_TOKEN, COURSES, COURSES_ALL } from '../../constants';
import api from '../../services/api/baseURL';

const initialState = {
	courses: [],
	isLoading: false,
	error: null,
};

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async () => {
		const response = await api(COURSES_ALL);
		return response.data?.result;
	}
);

export const deleteCourseAPI = createAsyncThunk(
	'courses/deleteCourseAPI',
	async (id, { dispatch }) => {
		const response = await api
			.delete(`${COURSES}/${id}`, { headers: AUTH_TOKEN })
			.then((res) => {
				dispatch(deleteCourse(id));
			});
		console.log(response);
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
		// fetch courses
		[fetchCourses.pending]: setLoading,
		[fetchCourses.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.courses = payload;
		},
		[fetchCourses.rejected]: setError,

		// delete course
		[deleteCourseAPI.pending]: setLoading,
		[deleteCourseAPI.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
		},
		[deleteCourseAPI.rejected]: setError,
	},
});

export const { addNewCourse, deleteCourse } = courseSlice.actions;

export const getCourses = ({ courses }) => courses.courses;

export default courseSlice.reducer;
