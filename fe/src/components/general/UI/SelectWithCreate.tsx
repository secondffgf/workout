import CreatableSelect from 'react-select/creatable'

export default function SelectWithCreate({
	name,
	options,
	selectedOption,
	handleChange,
	handleCreate
}) {
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#0069a8' : 'white',
			color: state.isSelected ? '#b8e6fe' : 'black',
			'&:hover': {
				backgroundColor: state.isSelected ? '#024a71' : '#74d4ff',
				color: state.isSelected ? '#b8e6fe' : 'black'
			}
		})
	}

	return (
	  <div className="w-[90%]">
		<CreatableSelect
			name={name}
			isClearable
			onChange={handleChange}
			onCreate={handleCreate}
			options={options}
			value={selectedOption}
			placeholder="Select or add new..."
			styles={customStyles}
		/>
		</div>
	)
}
