import { render, screen, fireEvent } from '@testing-library/react';

import { MockComponent } from '../../../helpers/MockComponent';
import Courses from '../Courses';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

const MockedCourses = MockComponent(<Courses />);

describe('Courses', () => {
	it('should be showed after a click on a button "Add new course', () => {
		render(MockedCourses);
		const addCourseBtn = screen.getByText(/add new course/i);

		fireEvent.click(addCourseBtn);

		expect(mockedNavigate).toHaveBeenCalledTimes(1);
		expect(mockedNavigate).toHaveBeenCalledWith('/courses/add');
	});
});
