import { TOKEN } from '../../constants';

export const setError = (state, { payload }) => {
	state.isLoading = false;
	state.error = payload;
};

export const setLoading = (state) => {
	state.isLoading = true;
	state.error = null;
};

export const userResolved = (state, { payload }) => {
	state.email = payload?.user.email;
	state.name = payload?.user.name || 'admin';
	state.role = payload?.user.role || 'user';
	state.token = payload?.token;
	state.isAuth = true;
	state.isLoading = false;
	state.error = null;
};

export const getToken = () => localStorage.getItem(TOKEN);
