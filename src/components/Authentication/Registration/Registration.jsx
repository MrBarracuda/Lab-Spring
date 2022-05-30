import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { register, registerUser } from '../../../features/user/userSlice';
import { handleInputChange } from '../../../hooks/handleInputChange';
import { LOGIN, SUBMIT } from '../../../constants';
import styles from '../Authentication.module.css';

import { Input } from '../../../common/Input/Input';
import { Button } from '../../../common/Button/Button';

const Registration = ({ userData, setUserData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(registerUser(userData))
			.then(({ payload }) => payload && navigate(LOGIN))
			.then(() => dispatch(register(userData)));
	};
	return (
		<div className={styles.auth}>
			<h1>Registration</h1>
			<form className={styles.authForm} onSubmit={handleSubmit}>
				<label>
					Name
					<Input
						required
						value={userData.name}
						name='name'
						type='text'
						onChange={(event) => handleInputChange(event, setUserData)}
					/>
				</label>
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
					type={SUBMIT}
					classN={styles.btnAuth}
					name='registration'
					value='Registration'
				/>
			</form>
			<p>
				If you have an account you can <Link to={LOGIN}>Login</Link>
			</p>
		</div>
	);
};
export default Registration;
