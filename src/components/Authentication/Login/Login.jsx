import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser, loginUser } from '../../../features/user/userSlice';
import { handleInputChange } from '../../../hooks/handleInputChange';
import { COURSES, REGISTRATION, SUBMIT } from '../../../constants';
import styles from '../Authentication.module.css';

import { Input } from '../../../common/Input/Input';
import { Button } from '../../../common/Button/Button';

const Login = ({ userData, setUserData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(loginUser(userData)).then(
			({ payload }) => payload.token && navigate(COURSES)
		);
	};

	return (
		<div className={styles.auth}>
			<h1>Login</h1>
			<form className={styles.authForm} onSubmit={handleSubmit}>
				<label>
					Email
					<Input
						required
						value={userData.email}
						name='email'
						type='email'
						onChange={(event) => handleInputChange(event, setUserData)}
					/>
				</label>
				<label>
					Password
					<Input
						required
						value={userData.password}
						name='password'
						type='password'
						onChange={(event) => handleInputChange(event, setUserData)}
					/>
				</label>
				<Button
					classN={styles.btnAuth}
					type={SUBMIT}
					name='login'
					value='Login'
				/>
				{user.error && <h6>{user.error}</h6>}
			</form>
			<p>
				If you do not have an account you can{' '}
				<Link to={REGISTRATION}>sing up</Link>
			</p>
		</div>
	);
};
export default Login;
