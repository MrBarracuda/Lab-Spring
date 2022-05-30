export const getCourseAuthors = (arrayOfIds, authors) =>
	authors?.map(
		(author) => arrayOfIds?.includes(author.id) && author.name + ','
	);
