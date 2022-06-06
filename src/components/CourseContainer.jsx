import { useSelector } from 'react-redux';

import { getAuthors } from '../features/authors/authorsSlice';
import { getCourseAuthors } from '../helpers/getCourseAuthors';

import CourseCard from './Courses/components/CourseCard/CourseCard';
import { getUser } from '../features/user/userSlice';
import { USER } from '../constants';

const CourseContainer = ({ courses }) => {
	const authors = useSelector(getAuthors);
	const { role } = useSelector(getUser);

	return (
		<>
			{courses &&
				courses.map((course) => {
					const courseAuthors = getCourseAuthors(course?.authors, authors);
					return (
						<CourseCard
							key={course?.id}
							role={role === USER}
							authorsList={courseAuthors}
							{...course}
						/>
					);
				})}
		</>
	);
};

export default CourseContainer;
