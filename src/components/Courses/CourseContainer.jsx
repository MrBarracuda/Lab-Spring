import { useSelector } from 'react-redux';

import { getAuthors } from '../../features/authors/authorsSlice';
import { getCourseAuthors } from '../../helpers/getCourseAuthors';

import CourseCard from './components/CourseCard/CourseCard';
import { getUser } from '../../features/user/userSlice';
import { USER } from '../../constants';
import { convertDate } from '../../helpers/convertDate';

const CourseContainer = ({ courses }) => {
	const authors = useSelector(getAuthors);
	const { role } = useSelector(getUser);

	return (
		<>
			{courses
				? courses.map((course) => {
						const courseAuthors = getCourseAuthors(course?.authors, authors);
						return (
							<CourseCard
								key={course?.id}
								role={role === USER}
								authorsList={courseAuthors}
								{...course}
								creationDate={convertDate(course.creationDate)}
							/>
						);
				  })
				: null}
		</>
	);
};

export default CourseContainer;
