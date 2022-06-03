import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCourses } from '../../features/courses/coursesSlice';
import { USER, COURSES_ADD, HIDDEN, VISIBLE } from '../../constants';

import { Button } from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import CourseContainer from '../CourseContainer';
import { getUser } from '../../features/user/userSlice';

const Courses = () => {
	const navigate = useNavigate();
	const { role } = useSelector(getUser);

	const courses = useSelector(getCourses);
	const [searchInput, setSearchInput] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([]);

	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		if (searchInput !== '') {
			const filteredCourses = courses.filter((item) =>
				Object.values(item)
					.join('')
					.toLowerCase()
					.includes(searchInput.toLowerCase())
			);
			setFilteredCourses(filteredCourses);
		} else {
			setFilteredCourses(courses);
		}
	};

	return (
		<>
			<nav>
				<SearchBar searchItems={searchItems} searchInput={searchInput} />
				<Button
					value='Add new course'
					handleClick={() => navigate(COURSES_ADD)}
					style={{ visibility: role === USER ? HIDDEN : VISIBLE }}
				/>
			</nav>
			<CourseContainer
				courses={searchInput.length > 1 ? filteredCourses : courses}
			/>
		</>
	);
};
export default Courses;
