import { useSelector } from 'react-redux';

import { getCourses } from '../features/courses/coursesSlice';
import { getAuthors } from '../features/authors/authorsSlice';

import CourseCard from './Courses/components/CourseCard/CourseCard';

export const getCourseAuthors = (arrayOfIds, authors) =>
	authors?.map(
		(author) => arrayOfIds?.includes(author.id) && author.name + ','
	);

const CourseContainer = () => {
	const courses = useSelector(getCourses);
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
