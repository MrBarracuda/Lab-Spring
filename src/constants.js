// course endpoints
export const COURSES = '/courses/';
export const COURSES_ALL = '/courses/all';
export const COURSES_ADD = '/courses/add';
export const COURSES_UPDATE = '/courses/update/';

// author endpoints
export const AUTHORS_ALL = '/authors/all';
export const AUTHORS_ADD = '/authors/add';

// authorization
export const REGISTRATION = '/registration';
export const REGISTER = '/register';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const USERS_ME = '/users/me';

// roles
export const ADMIN = 'admin';
export const USER = 'user';

// button types
export const BUTTON = 'button';
export const SUBMIT = 'submit';

// misc
export const VISIBLE = 'visible';
export const HIDDEN = 'hidden';
export const TOKEN = 'token';

const yo = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description:
			"Lorem Ipsum is simply dummy text of the printing and\n    typesetting industry. Lorem Ipsum\n    has been the industry's standard dummy text ever since the\n    1500s, when an unknown\n    printer took a galley of type and scrambled it to make a type\n    specimen book. It has survived\n    not only five centuries, but also the leap into electronic typesetting, remaining essentially u\n    nchanged.",
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description:
			"Lorem Ipsum is simply dummy text of the printing and\n    typesetting industry. Lorem Ipsum\n    has been the industry's standard dummy text ever since the\n    1500s, when an unknown\n    printer took a galley of type and scrambled it to make a type\n    specimen book.",
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];
