export const Button = ({
	value,
	classN,
	handleClick,
	disabled,
	name,
	type,
	form,
}) => {
	return (
		<button
			form={form}
			type={type}
			className={`btn ${classN}`}
			onClick={handleClick}
			disabled={disabled}
			name={name}
		>
			{value}
		</button>
	);
};
