import Input from 'components/general/UI/Input'
import TimeInput from 'components/general/UI/TimeInput'

export default function WorkoutInfo() {
	return (
		<div className="flex flex-wrap">
			<div className="w-full md:w-1/2 space-y-4">
				<Input
					type="number"
					width="w-1/4"
					label="Excersice time"
					name="time"
					required
				/>
				<Input
					type="number"
					label="Calories"
					width="w-1/4"
					name="calories"
					required
				/>
				<Input
					type="number"
					label="Puls (BPM)"
					width="w-1/4"
					name="puls"
					required
				/>
				<Input
					type="number"
					label="Puls (max BPM)"
					labelColor="text-red-500"
					width="w-1/4"
					name="maxPuls"
					required
				/>
			</div>
			<div className="w-full md:w-1/2 space-y-4">
				<TimeInput
					label="Intensive"
					width="w-1/4"
					labelColor="text-green-500"
					name="intensive"
					required
				/>
				<TimeInput
					label="Aerobisch"
					width="w-1/4"
					name="aero"
					required
				/>
				<TimeInput
					label="Anaerobisch"
					width="w-1/4"
					labelColor="text-red-500"
					name="anaero"
					required
				/>
				<Input
					type="number"
					label="Training Load"
					width="w-1/4"
					labelColor="text-green-500"
					name="trainingLoad"
					required
				/>
			</div>
		</div>
	)
}
