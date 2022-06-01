// course endpoints
export const COURSES = '/courses';
export const COURSES_ALL = '/courses/all';

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
export const TOKEN = localStorage.getItem('token');
export const AUTH_TOKEN = { Authorization: TOKEN };
