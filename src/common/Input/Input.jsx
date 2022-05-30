export const Input = ({
	value,
	onChange,
	placeHolder,
	name,
	type,
	required,
}) => {
	return (
		<>
			<label className='input-label'>
				<input
					required={required}
					value={value}
					onChange={onChange}
					placeholder={placeHolder}
					name={name}
					type={type}
				/>
			</label>
		</>
	);
};
