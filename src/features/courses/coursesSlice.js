import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/baseURL';
import { COURSES_ALL } from '../../constants';

const initialState = {
	courses: [],
	isLoading: true,
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
		addNewCourse: (state, { payload }) => ({
			...state,
			courses: [...state.courses, payload],
		}),
		deleteCourse: (state, { payload }) => ({
			...state,
			courses: state.courses.filter(({ id }) => id !== payload),
		}),
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCourses.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchCourses.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.courses = payload;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { addNewCourse, deleteCourse } = courseSlice.actions;

export const getCourses = ({ courses }) => courses.courses;

export default courseSlice.reducer;
