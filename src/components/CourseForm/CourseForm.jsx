import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { pipeDuration } from '../../helpers/pipeDuration';
import { getAuthors } from '../../features/authors/authorsSlice';
import { handleInputChange } from '../../hooks/handleInputChange';
import styles from './CourseForm.module.css';
import { SUBMIT, BUTTON, COURSES } from '../../constants';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import api from '../../services/api/baseURL';
import { createNewAuthor } from '../../features/authors/authorAction';
import { createNewCourse, update } from '../../features/courses/coursesAction';

const CourseForm = ({ courseInfo, setCourseInfo }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const authors = useSelector(getAuthors);
	const [newAuthor, setNewAuthor] = useState('');
	const [addedAuthors, setAddedAuthors] = useState([]);

	const getCourseAuthors = useMemo(() => {
		return authors
			?.map((author) => courseInfo?.authors.includes(author.id) && author)
			.filter(Boolean);
	}, [courseInfo.authors]);

	useEffect(() => {
		if (id) {
			setAddedAuthors(getCourseAuthors);
		}
	}, [getCourseAuthors]);
	console.log('re-render');
	useEffect(() => {
		if (id) {
			api(COURSES + id).then(({ data }) => setCourseInfo(data.result));
		} else {
			setCourseInfo({
				title: '',
				creationDate: '',
				description: '',
				duration: 0,
				authors: [],
			});
		}
	}, []);

	// //TODO fix a bug when sending put request with duration changed, it becomes a string instead of required number type

	const addAuthorToCourse = (event, id, name) => {
		if (addedAuthors.some((item) => item.id === id)) {
			console.log('You have already added this author to course');
		} else {
			setAddedAuthors((prev) => [...prev, { id, name }]);
			setCourseInfo((info) => ({
				...info,
				authors: [...info.authors, id],
			}));
		}
	};

	const deleteAuthorFromCourse = (event, id) =>
		setAddedAuthors((prev) => prev.filter((item) => item.id !== id));

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate(COURSES);
	};

	return (
		<form className={styles.firstForm} onSubmit={handleSubmit}>
			<div className={styles.upper}>
				<label>
					Title
					<Input
						required
						type='text'
						value={courseInfo?.title}
						onChange={(event) => handleInputChange(event, setCourseInfo)}
						name='title'
						placeHolder='Enter title...'
					/>
				</label>

				<Button
					type={SUBMIT}
					value={id ? 'Update course' : 'Create course'}
					handleClick={() => {
						if (id) {
							dispatch(update(courseInfo));
						} else {
							dispatch(createNewCourse(courseInfo));
						}
					}}
				/>
			</div>

			<label>
				Description
				<textarea
					required
					rows={6}
					value={courseInfo?.description}
					onChange={(event) => handleInputChange(event, setCourseInfo)}
					name='description'
					placeholder='Enter description...'
				></textarea>
			</label>

			<div className={styles.secondForm}>
				<div className={styles.left}>
					<h3>Add author</h3>
					<label>
						Author name
						<Input
							value={newAuthor}
							onChange={(event) => setNewAuthor(event.target.value)}
							type='text'
							name='authors'
							placeHolder='Enter authors name...'
						/>
					</label>
					<Button
						type={BUTTON}
						value='Create author'
						classN={styles.btnCreateAuthor}
						handleClick={() => {
							dispatch(createNewAuthor({ name: newAuthor }));
							// dispatch(sendAuthor(newAuthor));
						}}
					/>
					<h3>Duration</h3>
					<label>
						Duration
						<Input
							required
							type='number'
							value={courseInfo?.duration}
							onChange={(event) => handleInputChange(event, setCourseInfo)}
							name='duration'
							placeHolder='0'
						/>
					</label>
					<div className={styles.durationTimer}>
						Duration:{' '}
						<span>
							{Boolean(courseInfo?.duration)
								? pipeDuration(courseInfo?.duration)
								: '00:00 hours'}
						</span>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.authors}>
						<h3>Authors</h3>
						<ul>
							{authors?.map((author) => (
								<li className={styles.authorsList} key={author.id}>
									{author.name}
									<Button
										type={BUTTON}
										name='Add author'
										value='Add author'
										handleClick={(event) =>
											addAuthorToCourse(event, author.id, author.name)
										}
									/>
								</li>
							))}
						</ul>
						<h3>Course authors</h3>

						<ul className={styles.courseAuthors}>
							{addedAuthors.length < 1 ? (
								<h2>Author list is empty</h2>
							) : (
								addedAuthors?.map((author) => (
									<li className={styles.authorsList} key={author.id}>
										{author.name}
										<Button
											type={BUTTON}
											name='Delete author'
											value='Delete author'
											handleClick={(event) =>
												deleteAuthorFromCourse(event, author.id)
											}
										/>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CourseForm;
