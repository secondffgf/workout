import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import WorkoutSnapshot from './WorkoutSnapshot'
import { Tooltip as ReactTooltip } from "react-tooltip"
import WorkoutTooltipContent from './WorkoutTooltipContent'

const PAGE_SIZE = 4

interface WorkoutDetailProps {
	workouts: any[];
	selectWorkout: (workout: any, checked: boolean) => void;
	showCheckbox?: boolean;
	refreshFavorites?: () => void;
}

export default function WorkoutDetail({
	workouts,
	selectWorkout,
	showCheckbox = false,
	refreshFavorites = () => {}
}: WorkoutDetailProps) {
	const [leftSelected, setLeftSelected] = useState(null)
	const [rightSelected, setRightSelected] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const totalPages = Math.max(1, Math.ceil(workouts.length / PAGE_SIZE))
		if (currentPage > totalPages) {
			setCurrentPage(totalPages)
		}
	}, [currentPage, workouts.length])

	const paginatedWorkouts = workouts.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	)

	return (
		<>
			<div className="flex items-center justify-between w-3/4 mt-4 text-gray-700 ml-6">
				<span className="text-gray-500 w-1/6 ml-12 pl-6">Date</span>
				<span className="text-gray-500">Training Load</span>
				<span className="text-gray-500">Calories</span>
				<span>&nbsp;</span>
			</div>
			<div className="pr-6">
				{paginatedWorkouts.map((item, index) => (
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
			{workouts.length > PAGE_SIZE && (
				<div className="mt-4 flex justify-center">
					<Pagination
						current={currentPage}
						pageSize={PAGE_SIZE}
						total={workouts.length}
						onChange={setCurrentPage}
						showSizeChanger={false}
					/>
				</div>
			)}
			{paginatedWorkouts.map((item, index) => (
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
