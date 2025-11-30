import CloseButton from 'components/general/UI/CloseButton'

export default function SelectedWorkout({ data, onClose }) {
	console.log(data)

	return (
		<div className="w-1/2 mt-16">
		  <div className="flex">
				<CloseButton
					onClick={onClose}
				/>
			</div>
			Selected Workout!
			<div>
			  {data.date}
			</div>
		</div>
	)
}
