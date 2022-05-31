export const setError = (state, { payload }) => ({
	...state,
	isLoading: false,
	error: payload,
});

export const setLoading = (state) => ({
	...state,
	isLoading: true,
	error: null,
});
