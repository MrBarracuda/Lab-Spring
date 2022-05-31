import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../features/user/userSlice';
import { ADMIN, COURSES } from '../../constants';

const PrivateRouter = ({ children }) => {
	const navigate = useNavigate();
	const { role } = useSelector(getUser);

	return role === ADMIN ? (
		<div className='adminRoute'>{children}</div>
	) : (
		<div>users route</div>
	);
};

export default PrivateRouter;
