import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

const MockLogo = () => (
	<Router>
		<Logo />
	</Router>
);

describe('Header Logo', () => {
	it('should have src tag', () => {
		render(<MockLogo />);
		const logo = screen.getByRole('img');
		expect(logo).toHaveAttribute('src', '/logo.png');
	});

	it('should have alt tag', () => {
		render(<MockLogo />);
		const logo = screen.getByRole('img');
		expect(logo).toHaveAttribute('alt', 'logo');
	});
});
