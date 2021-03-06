import { useDispatch, useSelector } from 'react-redux';

import { LOGIN, SUBMIT } from '../../constants';
import { getUser } from '../../features/user/userSlice';
import { logout } from '../../features/user/userAction';

import styles from './Header.module.css';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentUser = useSelector(getUser);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(logout()).then(() => navigate(LOGIN));
	};

	return (
		<div className={styles.header}>
			<Logo />
			{currentUser?.isAuth && (
				<form onSubmit={handleSubmit}>
					<div className={styles.userName}>{currentUser.name}</div>
					<Button type={SUBMIT} value='Logout' classN={styles.btnLogout} />
				</form>
			)}
		</div>
	);
};
export default Header;
