import { render, screen } from '@testing-library/react';
import CourseContainer from '../CourseContainer';
import { MockComponent } from '../../../helpers/MockComponent';

const courses = [
	{
		id: 'ab5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Test title',
		description: 'Test description',
		creationDate: '08/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Test title 2',
		description: 'Test description 2',
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

const emptyArray = [];

const MockedCourseContainer = MockComponent(
	<CourseContainer courses={courses} />
);

const MockedEmptyCourseContainer = MockComponent(
	<CourseContainer courses={emptyArray} />
);

describe('CourseContainer', () => {
	it('should display amount of CourseCard equal length of courses array', () => {
		render(MockedCourseContainer);
		const { length } = screen.getAllByTestId(/course-card/i);
		expect(length).toBe(courses.length);
	});

	it('should display Empty container if courses array length is 0', () => {
		render(MockedEmptyCourseContainer);
		const { length } = screen.queryAllByTestId(/course-card/i);
		expect(length).toBe(emptyArray.length);
	});
});
