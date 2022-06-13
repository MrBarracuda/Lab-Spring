import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockedStore } from '../app/__test__/mockedStore';

export const MockComponent = (component) => (
	<Provider store={mockedStore}>
		<Router>{component}</Router>
	</Provider>
);
