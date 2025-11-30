import Input from 'components/general/UI/Input'
import SelectWithCreate from 'components/general/UI/SelectWithCreate'
import CloseButton from 'components/general/UI/CloseButton'

export default function Exercise({
	nameOptions,
	nameValue,
	weightValue,
	handleChangeName,
	handleCreateName,
	onChangeWeight,
	disabled,
	input,
	handleCloseExercise
}) {
	return (
		<>
			<div className="mt-4 flex justify-between items-center">
			  <span>
				Exercise {input.id + 1}:
				</span>
				<div>
					<CloseButton
						onClick={(e) => handleCloseExercise(e, input.id)}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div className="w-1/2">
					<label className="">
						<span className="text-sm font-semibold text-stone-500">Name:</span>
					<SelectWithCreate
					  name={`ex_name_${input.id}`}
						options={nameOptions}
						selectedOption={nameValue}
						handleChange={(value) => handleChangeName(value, input.id)}
						handleCreate={(value) => handleCreateName(value, input.id)}
					/>
					</label>
				</div>
				<div className="w-1/2">
				  <Input
						name={`ex_weight_${input.id}`}
				  	type="number"
				  	label="Weight"
				  	width="w-3/4"
				  	disabled={disabled}
				  	value={weightValue}
				  	onChange={(e) => onChangeWeight(input.id, e.target.value)}
						required
				  />
				</div>
			</div>	
		</>
	)
}
