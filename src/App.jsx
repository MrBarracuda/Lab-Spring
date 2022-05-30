import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { fetchCourses } from './features/courses/coursesSlice';
import { fetchAuthors } from './features/authors/authorsSlice';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Authentication/Registration/Registration';
import Login from './components/Authentication/Login/Login';
import { Wrapper } from './components/Wrapper';

function App() {
	const dispatch = useDispatch();

	const isAuth = Boolean(localStorage.getItem('token'));
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

	return (
		<div className='app'>
			<Header isAuth={isAuth} />
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
						element={<Navigate to={isAuth ? '/courses' : '/login'} replace />}
					/>
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:id' element={<CourseInfo />} />
					<Route path='/courses/add' element={<CreateCourse />} />
				</Routes>
			</Wrapper>
		</div>
	);
}
export default App;
