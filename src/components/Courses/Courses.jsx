import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';

import CourseContainer from '../CourseContainer';
import { COURSES } from '../../constants';

const Courses = () => {
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState('');

	const navigateToCreateCourse = (event) => {
		event.preventDefault();
		navigate(`${COURSES}/add`);
	};

	const onChangeSearchInput = (event) => {
		setSearchInput(event.target.value);
	};

	return (
		<>
			<nav>
				<SearchBar
					onChangeSearchInput={onChangeSearchInput}
					searchInput={searchInput}
				/>
				<Button value='Add new course' handleClick={navigateToCreateCourse} />
			</nav>
			<CourseContainer />
		</>
	);
};
export default Courses;
