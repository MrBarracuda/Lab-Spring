import { useDispatch } from 'react-redux';

import { LOGIN, SUBMIT } from '../../constants';
import { logout } from '../../features/user/userSlice';
import styles from './Header.module.css';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuth }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userName = localStorage.getItem('userName');

	const handleSubmit = (event) => {
		event.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		dispatch(logout());
		navigate(LOGIN);
	};

	return (
		<div className={styles.header}>
			<Logo />
			{isAuth && (
				<form onSubmit={handleSubmit}>
					<div className={styles.userName}>{userName}</div>
					<Button type={SUBMIT} value='Logout' classN={styles.btnLogout} />
				</form>
			)}
		</div>
	);
};
export default Header;
