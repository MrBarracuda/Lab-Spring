import { useSelector } from 'react-redux';

import { getAuthors } from '../features/authors/authorsSlice';
import { getCourseAuthors } from '../helpers/getCourseAuthors';

import CourseCard from './Courses/components/CourseCard/CourseCard';

const CourseContainer = ({ courses }) => {
	const authors = useSelector(getAuthors);

	return (
		<>
			{courses &&
				courses.map((course) => {
					const courseAuthors = getCourseAuthors(course.authors, authors);
					return (
						<CourseCard
							key={course.id}
							authorsList={courseAuthors}
							{...course}
						/>
					);
				})}
		</>
	);
};

export default CourseContainer;
