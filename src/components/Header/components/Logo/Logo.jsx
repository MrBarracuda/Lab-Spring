import { Link } from 'react-router-dom';

export const Logo = () => (
	<Link to='/'>
		<img
			width={70}
			src='https://s.udemycdn.com/meta/default-meta-image-v2.png'
			alt='logo'
		/>
	</Link>
);
