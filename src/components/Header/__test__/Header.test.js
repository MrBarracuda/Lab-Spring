import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { mockedStore } from '../../../app/__test__/mockedStore';
import Header from '../Header';

const MockHeader = () => (
	<Provider store={mockedStore}>
		<Router>
			<Header />
		</Router>
	</Provider>
);

it("Should have user's name", () => {
	render(<MockHeader />);
	const userNameElement = screen.getByText('Test Name');
	expect(userNameElement.textContent).toBe('Test Name');
});
