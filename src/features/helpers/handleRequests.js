export const setError = (state, { payload }) => {
	state.isLoading = false;
	state.error = payload;
};

export const setLoading = (state) => {
	state.isLoading = true;
	state.error = null;
};
