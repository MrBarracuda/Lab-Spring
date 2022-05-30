import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CourseCard.module.css';

import { deleteCourse } from '../../../../features/courses/coursesSlice';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { convertDate } from '../../../../helpers/convertDate';

import { Button } from '../../../../common/Button/Button';
import { BUTTON, COURSES } from '../../../../constants';

const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	id,
	authorsList,
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
					handleClick={() => navigate(`${COURSES}/${id}`)}
				/>
				<Button
					type={BUTTON}
					name='edit'
					value='e'
					classN={styles.btnSmall}
					handleClick={(event) => console.log(event.target)}
				/>
				<Button
					type={BUTTON}
					name='delete'
					value='d'
					classN={styles.btnSmall}
					handleClick={() => dispatch(deleteCourse(id))}
				/>
			</div>
		</div>
	);
};
export default CourseCard;
