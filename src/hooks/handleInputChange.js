export const handleInputChange = (event, fn) => {
	event.preventDefault();
	const { name, value } = event.target;
	fn((prevState) => ({
		...prevState,
		[name]: value,
	}));
};
