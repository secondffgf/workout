import { useState } from 'react'
import WorkoutSnapshot from './WorkoutSnapshot'
import { Tooltip as ReactTooltip } from "react-tooltip"
import WorkoutTooltipContent from './WorkoutTooltipContent'

export default function WorkoutDetail({
	workouts,
	selectWorkout,
	heightClass,
	showCheckbox,
	refreshFavorites = () => {}
}) {
	const [leftSelected, setLeftSelected] = useState(null)
	const [rightSelected, setRightSelected] = useState(null)

	return (
		<>
			<div className="flex items-center justify-between w-3/4 mt-4 text-gray-700 ml-6">
				<span className="text-gray-500 w-1/6 ml-12 pl-6">Date</span>
				<span className="text-gray-500">Training Load</span>
				<span className="text-gray-500">Calories</span>
				<span>&nbsp;</span>
			</div>
			<div className={`${heightClass} overflow-y-auto overflow-x-hidden pr-6`}>
				{workouts.map((item, index) => (
					<WorkoutSnapshot
					  key={`snapshot_${item.id}_${index}`}
						workout={item}
						onSelect={selectWorkout}
						showCheckbox={showCheckbox}
						leftSelected={leftSelected}
						setLeftSelected={setLeftSelected}
						rightSelected={rightSelected}
						setRightSelected={setRightSelected}
						refreshFavorites={refreshFavorites}
					/>
				))}
			</div>
			{workouts.map((item, index) => (
				<ReactTooltip
				  id={item.id}
					key={`${item.id}_${index}`}
					place="top"
					style={{ backgroundColor : '#f3f4f6', color: "black" }}
					opacity={1}
				>
					<WorkoutTooltipContent
						key={index}
						item={item}
					/>
				</ReactTooltip>
			))}
		</>
	)
}
