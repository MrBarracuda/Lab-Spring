import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CourseCard.module.css';

import { deleteCourseById } from '../../../../features/courses/coursesAction';
import { pipeDuration } from '../../../../helpers/pipeDuration';

import { Button } from '../../../../common/Button/Button';
import {
	BUTTON,
	COURSES,
	COURSES_UPDATE,
	HIDDEN,
	VISIBLE,
} from '../../../../constants';

const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	id: courseId,
	authorsList,
	role,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className={styles.courseCardItem} data-testid='course-card'>
			<div className={styles.leftSide}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
			</div>

			<div className={styles.rightSide}>
				<div>
					<span className={styles.subTitle}>Authors: </span>
					{authorsList}
				</div>
				<div>
					<span className={styles.subTitle}>Duration: </span>
					{pipeDuration(duration)}
				</div>
				<div>
					<span className={styles.subTitle}>Created: </span>
					{creationDate}
				</div>
				<Button
					type={BUTTON}
					value='Show course'
					handleClick={() => navigate(COURSES + courseId)}
				/>
				<Button
					type={BUTTON}
					name='edit'
					value='e'
					classN={styles.btnSmall}
					style={{ visibility: role ? HIDDEN : VISIBLE }}
					handleClick={() => navigate(COURSES_UPDATE + courseId)}
				/>
				<Button
					type={BUTTON}
					name='delete'
					value='d'
					style={{ visibility: role ? HIDDEN : VISIBLE }}
					classN={styles.btnSmall}
					handleClick={() => dispatch(deleteCourseById(courseId))}
				/>
			</div>
		</div>
	);
};
export default CourseCard;
