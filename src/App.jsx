import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { fetchCourses, getCourses } from './features/courses/coursesSlice';
import { fetchAuthors } from './features/authors/authorsSlice';
import { COURSES, LOGIN } from './constants';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Authentication/Registration/Registration';
import Login from './components/Authentication/Login/Login';
import { Wrapper } from './components/Wrapper';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { fetchCurrentUser } from './features/user/userSlice';

function App() {
	const dispatch = useDispatch();
	const token = Boolean(localStorage.getItem('token'));

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

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<div className='app'>
			<Header />
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
						element={<Navigate to={token ? COURSES : LOGIN} replace />}
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
