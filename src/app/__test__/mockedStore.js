const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [
		{
			title: 'Test title',
			description: 'Test description',
			creationDate: '08/3/2021',
			duration: 160,
			authors: [
				'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				'f762978b-61eb-4096-812b-ebde22838167',
			],
		},
	],
	authors: [
		{
			id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			name: 'Test author 1',
		},
		{
			id: 'f762978b-61eb-4096-812b-ebde22838167',
			name: 'Test author 2',
		},
	],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export const getMockedCourses = ({ courses }) => mockedState.courses;
export const getMockedAuthors = ({ authors }) => mockedState.authors;
// export const getCourses = ({ courses }) => mockedState.courses;
