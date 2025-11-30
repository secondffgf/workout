import Select from 'react-select'

export default function WorkoutSelect({ selectedOption, handleChange, options, isMulti }) {
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

	return ( <Select
		value={selectedOption}
		onChange={handleChange}
		options={options}
		styles={customStyles}
	/>)
}
