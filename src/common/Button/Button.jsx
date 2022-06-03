export const Button = ({
	value,
	classN,
	handleClick,
	disabled,
	name,
	type,
	form,
	style,
}) => {
	return (
		<button
			form={form}
			type={type}
			className={`btn ${classN}`}
			onClick={handleClick}
			disabled={disabled}
			name={name}
			style={style}
		>
			{value}
		</button>
	);
};
