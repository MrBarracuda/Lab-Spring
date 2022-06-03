import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getUser } from '../../features/user/userSlice';
import { ADMIN, COURSES } from '../../constants';

export const PrivateRouter = ({ children }) => {
	const { role } = useSelector(getUser);
	return role === ADMIN ? (
		<div className='privateRoute'>{children}</div>
	) : (
		<Navigate to={COURSES} />
	);
};
