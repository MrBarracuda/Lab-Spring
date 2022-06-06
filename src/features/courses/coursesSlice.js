import { createSlice } from '@reduxjs/toolkit';

import { setError, setLoading } from '../helpers/handleRequests';
import {
	getAllCourses,
	deleteCourseById,
	createNewCourse,
	update,
} from './coursesAction';

const initialState = {
	courses: [],
	isLoading: false,
	error: null,
};

export const courseSlice = createSlice({
	name: 'courses',
	initialState,
	extraReducers: {
		// fetch courses
		[getAllCourses.pending]: setLoading,
		[getAllCourses.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.courses = payload;
		},
		[getAllCourses.rejected]: setError,

		// delete course
		[deleteCourseById.pending]: setLoading,
		[deleteCourseById.fulfilled]: (state) => {
			state.isLoading = false;
			state.error = null;
		},
		[deleteCourseById.rejected]: setError,

		// create new course
		[createNewCourse.pending]: setLoading,
		[createNewCourse.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.courses.push(payload);
		},
		[createNewCourse.rejected]: setError,

		// update course info
		[update.pending]: setLoading,
		[update.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			// state.courses = state.courses.map((course) => {
			// 	return course.id === payload.id
			// 		? { ...course, newValue: null }
			// 		: course;
			// });
		},
		[update.rejected]: setError,
	},
});

// eslint-disable-next-line no-empty-pattern
export const {} = courseSlice.actions;

export const getCourses = ({ courses }) => courses.courses;

export default courseSlice.reducer;
