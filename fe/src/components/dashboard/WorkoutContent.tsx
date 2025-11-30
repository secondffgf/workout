import Badge from 'components/general/Badge'

export default function WorkoutContent({ children }) {
	return (
	  <div className="flex-none h-auto w-[40rem] relative">
			<div className="flex flex-col items-center mt-8">
				{children}
			</div>
			<div>
				<Badge
					className="absolute top-0 right-0"
				/>
			</div>
		</div>
	)
}
