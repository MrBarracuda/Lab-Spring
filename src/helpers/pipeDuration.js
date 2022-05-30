export const pipeDuration = (duration) => {
	let result;
	if (duration < 60) {
		result = `${duration} minutes`;
	} else {
		let hours = String(Math.floor(duration / 60)).padStart(2, '0');
		let minutes = String(duration % 60).padStart(2, '0');
		result = `${hours}:${minutes} hours`;
	}
	// .replace(/^0+/g, '');
	return duration < 1 ? '0 minutes' : result;
};
