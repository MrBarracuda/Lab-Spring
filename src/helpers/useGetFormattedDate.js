export const useGetFormattedDate = (date) => {
	let formattedDate;
	formattedDate = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	return formattedDate;
};
