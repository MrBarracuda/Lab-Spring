import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { fetchCourses } from './features/courses/coursesSlice';
import { fetchAuthors } from './features/authors/authorsSlice';
import api from './services/api/baseURL';
import { ADMIN } from './constants';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Authentication/Registration/Registration';
import Login from './components/Authentication/Login/Login';
import { Wrapper } from './components/Wrapper';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { getUser } from './features/user/userSlice';

function App() {
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, [dispatch]);

	// useEffect(() => {
	// 	const getCurrentUser = async () => {
	// 		if (token) {
	// 			const responce = await api.get('/users/me');
	// 			console.log(responce);
	// 		}
	// 	};
	// 	getCurrentUser();
	// }, []);

	return (
		<div className='app'>
			<Header isAuth={Boolean(token)} />
			<Wrapper>
				<Routes>
					<Route
						path='/login'
						element={<Login userData={userData} setUserData={setUserData} />}
					/>
					<Route
						path='/registration'
						element={
							<Registration userData={userData} setUserData={setUserData} />
						}
					/>
					<Route
						path='/'
						element={<Navigate to={token ? '/courses' : '/login'} replace />}
					/>
					{/*<Route path='/courses' element={<PrivateRouter />} />*/}
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:id' element={<CourseInfo />} />
					<Route path='/courses/add' element={<CourseForm />} />
				</Routes>
			</Wrapper>
		</div>
	);
}
export default App;
