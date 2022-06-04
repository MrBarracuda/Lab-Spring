import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { fetchCourses } from './features/courses/coursesSlice';
import { fetchAuthors } from './features/authors/authorsSlice';
import {
	COURSES,
	COURSES_ADD,
	COURSES_UPDATE,
	LOGIN,
	REGISTRATION,
} from './constants';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Authentication/Registration/Registration';
import Login from './components/Authentication/Login/Login';
import { Wrapper } from './components/Wrapper';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';
import { fetchCurrentUser } from './features/user/userAction';
import { v4 as uuidv4 } from 'uuid';
import { useGetFormattedDate } from './helpers/useGetFormattedDate';

function App() {
	const dispatch = useDispatch();
	const token = Boolean(localStorage.getItem('token'));

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [courseInfo, setCourseInfo] = useState({
		title: '',
		id: uuidv4(),
		creationDate: useGetFormattedDate(new Date()),
		description: '',
		duration: 0,
		authors: [],
	});

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, [dispatch]);

	useEffect(() => {
		token && dispatch(fetchCurrentUser());
	}, [dispatch, token]);

	return (
		<div className='app'>
			<Header />
			<Wrapper>
				<Routes>
					<Route
						path={LOGIN}
						element={<Login userData={userData} setUserData={setUserData} />}
					/>
					<Route
						path={REGISTRATION}
						element={
							<Registration userData={userData} setUserData={setUserData} />
						}
					/>
					<Route
						path='/'
						element={<Navigate to={token ? COURSES : LOGIN} replace />}
					/>
					{/*<Route path='/courses' element={<PrivateRouter />} />*/}
					<Route
						path={COURSES}
						element={
							<Courses courseInfo={courseInfo} setCourseInfo={setCourseInfo} />
						}
					/>
					<Route path={COURSES + '/:id'} element={<CourseInfo />} />
					<Route
						path={COURSES_UPDATE + '/:id'}
						element={
							<CourseForm
								setCourseInfo={setCourseInfo}
								courseInfo={courseInfo}
							/>
						}
					/>
					<Route
						path={COURSES_ADD}
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					></Route>
				</Routes>
			</Wrapper>
		</div>
	);
}
export default App;
