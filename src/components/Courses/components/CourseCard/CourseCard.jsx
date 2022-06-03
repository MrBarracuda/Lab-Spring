import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CourseCard.module.css';

import { deleteCourseAPI } from '../../../../features/courses/coursesSlice';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { convertDate } from '../../../../helpers/convertDate';

import { Button } from '../../../../common/Button/Button';
import {
	BUTTON,
	COURSES,
	COURSES_UPDATE,
	HIDDEN,
	VISIBLE,
} from '../../../../constants';
import { FontAwesomeIcon } from '../../../../common/Icons/FontAwesomeIcon';

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
		<div className={styles.courseCardItem}>
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
					{convertDate(creationDate)}
				</div>
				<Button
					type={BUTTON}
					value='Show course'
					handleClick={() => navigate(`${COURSES}/${courseId}`)}
				/>

				<FontAwesomeIcon icon='fa-solid fa-circle-trash' />
				<Button
					type={BUTTON}
					name='edit'
					value='e'
					classN={styles.btnSmall}
					style={{ visibility: role ? HIDDEN : VISIBLE }}
					handleClick={() => navigate(COURSES_UPDATE + '/' + courseId)}
				/>
				<Button
					type={BUTTON}
					name='delete'
					value='d'
					style={{ visibility: role ? HIDDEN : VISIBLE }}
					classN={styles.btnSmall}
					handleClick={() => dispatch(deleteCourseAPI(courseId))}
				/>
			</div>
		</div>
	);
};
export default CourseCard;
