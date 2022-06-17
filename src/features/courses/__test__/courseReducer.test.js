import { store } from '../../../app/store';
import { mockedStore } from '../../../app/__test__/mockedStore';
import { getAllCourses } from '../coursesAction';
import reducer from '../coursesSlice';
import { createNewCourse } from '../coursesAction';
import { TEST_COURSE } from '../../../constants';
import courses from '../../../components/Courses/Courses';

describe('Courses reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			courses: [],
			isLoading: false,
			error: null,
		});
	});

	it('should handle createNewCourse and returns new state', () => {
		const previousState = {
			courses: [...TEST_COURSE],
			isLoading: false,
			error: null,
		};

		let newCourse = {
			id: '3-de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
			title: 'JavaScript',
			description:
				"Lorem Ipsum is simply dummy text of the printing and\n    typesetting industry. Lorem Ipsum\n    has been the industry's standard dummy text ever since the\n    1500s, when an unknown\n    printer took a galley of type and scrambled it to make a type\n    specimen book. It has survived\n    not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
			creationDate: '08/3/2021',
			duration: 160,
			authors: ['f762978b-61eb-4096-812b-ebde22838167'],
		};

		let expectedState = { ...previousState };
		expectedState.courses.push(newCourse);

		expect(reducer(previousState, createNewCourse(newCourse))).toEqual(
			expectedState
		);
	});

	it('should handle getAllCourses and returns new state', () => {
		expect(
			reducer(
				{ courses: TEST_COURSE, isLoading: false, error: null },
				getAllCourses()
			)
		).toEqual({ courses: TEST_COURSE, isLoading: false, error: null });
	});
});
