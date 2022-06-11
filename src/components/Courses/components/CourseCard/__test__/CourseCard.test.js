import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockedStore } from '../../../../../app/__test__/mockedStore';
import CourseCard from '../CourseCard';

const MockCourseCard = () => {
	return (
		<Provider store={mockedStore}>
			<Router>
				<CourseCard
					title={'Test title'}
					description={'Test description'}
					authorsList={'Test author 1, Test author 2'}
					creationDate={'10.06.2022'}
					duration={65}
				/>
			</Router>
		</Provider>
	);
};

describe('Course Card', () => {
	it('should display title', () => {
		render(<MockCourseCard />);
		expect(screen.getByText('Test title')).toBeInTheDocument();
	});

	it('should display description', () => {
		render(<MockCourseCard />);
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	it('should display authors list', () => {
		render(<MockCourseCard />);
		expect(
			screen.getByText('Test author 1, Test author 2')
		).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		render(<MockCourseCard />);
		const regex = /(0\d|1\d|2[0-3]):[0-5]\d/gm;
		const durationElement = screen.getByText(/01:05/);
		expect(durationElement.textContent).toMatch(regex);
	});

	// it('should display created date in the correct format', () => {
	// 	render(<MockCourseCard />);
	// 	const regex = /^(0?[1-9]|[12]\d|3[01])[.-](0?[1-9]|1[012])[.-]\d{4}$/;
	// 	expect(screen.getByText('10.06.2022')).toMatch(regex);
	// });
});
