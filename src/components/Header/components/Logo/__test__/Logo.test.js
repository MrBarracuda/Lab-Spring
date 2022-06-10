import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

const MockLogo = () => (
	<Router>
		<Logo />
	</Router>
);

it("should have logo and user's name", () => {
	render(<MockLogo />);
	const logo = screen.getByRole('img');
	expect(logo).toHaveAttribute('src', '/logo.png');
	expect(logo).toHaveAttribute('alt', 'logo');
});
