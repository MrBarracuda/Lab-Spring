import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api/baseURL';
import { COURSES, BUTTON } from '../../constants';
import styles from './CourseInfo.module.css';
import { getCourseAuthors } from '../CourseContainer';

import { Button } from '../../common/Button/Button';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../features/authors/authorsSlice';

const CourseInfo = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [course, setCourse] = useState({});
	const authors = useSelector(getAuthors);

	useEffect(() => {
		api.get(`${COURSES}/${id}`).then((res) => setCourse(res.data.result));
	}, [id]);

	return (
		<div>
			<Button
				name='back-btn'
				value='< Back to courses'
				type={BUTTON}
				classN={styles.btnBack}
				handleClick={() => navigate(COURSES)}
			/>
			{course && (
				<>
					<h2 className={styles.heading}>{course.title}</h2>
					<div className={styles.courseCard}>
						<div className={styles.description}>{course.description}</div>
						<div className={styles.detailedInfo}>
							<ul>
								<li>
									<b>ID:</b> {course.id}
								</li>
								<li>
									<b>Duration:</b> {course.duration}
								</li>
								<li>
									<b>Created:</b> {course.creationDate}
								</li>
								<li>
									<b>Authors: </b>
									{getCourseAuthors(course.authors, authors)}
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CourseInfo;
