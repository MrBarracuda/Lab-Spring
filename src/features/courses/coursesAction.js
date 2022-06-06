import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api/baseURL';
import { COURSES, COURSES_ADD, COURSES_ALL } from '../../constants';
import { getToken } from '../helpers/handleRequests';

export const getAllCourses = createAsyncThunk(
	'courses/getAllCourses',
	async () => {
		const { data } = await api(COURSES_ALL);
		return data?.result;
	}
);

export const deleteCourseById = createAsyncThunk(
	'courses/deleteCourseById',
	async (id, { dispatch }) => {
		await api.delete(COURSES + id, {
			headers: { Authorization: getToken() },
		});
		dispatch(getAllCourses());
	}
);
export const createNewCourse = createAsyncThunk(
	'courses/createNewCourse',
	async (course) => {
		course.duration = Number(course.duration);
		const { data } = await api.post(COURSES_ADD, course, {
			headers: { Authorization: getToken() },
		});
		return data?.result;
	}
);

export const update = createAsyncThunk(
	'courses/update',
	async (course, { dispatch }) => {
		const { data } = await api.put(COURSES + course?.id, course, {
			headers: { Authorization: getToken() },
		});
		dispatch(getAllCourses());
		return data?.result;
	}
);
