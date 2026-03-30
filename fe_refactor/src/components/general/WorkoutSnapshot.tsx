import { useState } from 'react'
import Button from '@/components/general/UI/Button'
import CheckboxSlider from '@/components/general/UI/CheckboxSlider'
import {
	FaRegHandPointLeft,
	FaRegHandPointRight
} from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import useHttp from '@/hooks/useHttp';

const ColoredCircleNumber = ({ number, colorClass = 'bg-blue-500' }:
	{number: string, colorClass?: string}) => {
	const match = colorClass.match(/\d+$/);
	const colorNumber = match ? parseInt(match[0], 10) : 0;
	let textColor = colorNumber >= 400 ? ' text-white' : ' text-black'
	let classes = colorClass
		+ " font-bold rounded-full h-10 w-10 flex items-center justify-center"
		+ textColor

  return (
    <div
  		className={classes}
  	>
  		{number}
  	</div>
  )
}

const colors = [
	'bg-orange-100',
	'bg-orange-200',
	'bg-orange-300',
	'bg-orange-400',
	'bg-orange-500',
	'bg-orange-600',
	'bg-orange-700',
	'bg-orange-800',
	'bg-orange-900',
	'bg-green-100',
	'bg-green-200',
	'bg-green-300',
	'bg-green-400',
	'bg-green-500',
	'bg-green-600',
	'bg-green-700',
	'bg-green-800',
	'bg-green-900',
]
const shades = [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ]

function colorShade(num: number, color: 'green' | 'orange', min: number, max: number) {
	let colorNumber = getColorNumber(num, min, max)
	if (color === 'green') {
		return `bg-green-${colorNumber}`
	} else if (color === 'orange') {
		return `bg-orange-${colorNumber}`
	}
}

const getColorNumber = (num: number, min: number, max: number) => {
	if (num <= min) return shades[0]
	if (num >= max) return shades[shades.length - 1]

	const ratio = (num - min) / (max - min)
	const index = Math.floor(ratio * (shades.length - 1))
	return shades[index]
}

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}

export default function WorkoutSnapshot({
	workout,
	onSelect,
	showCheckbox,
	leftSelected,
	setLeftSelected,
	rightSelected,
	setRightSelected,
	refreshFavorites = () => {}
}: {
	workout: any;
	onSelect: (workout: any, checked: boolean) => void;
	showCheckbox: boolean;
	leftSelected: any;
	setLeftSelected: (id: any) => void;
	rightSelected: any;
	setRightSelected: (id: any) => void;
	refreshFavorites?: () => void;

}) {
	const [snapshot, setSnapshot] = useState(workout)
	const [checked, setChecked] = useState(false)
	const {
		error: _,
		sendRequest
	} = useHttp(
		'/api/favorites',
		requestConfig,
		null
	)

	const handleSelect = (snapshot: { id: any; }, checked: boolean) => {
		onSelect(snapshot, checked)
		if (checked) {
			setRightSelected(snapshot.id)
			if (leftSelected === snapshot.id) {
				setLeftSelected(null)
			}
		} else {
			setLeftSelected(snapshot.id)
			if (rightSelected == snapshot.id) {
				setRightSelected(null)
			}
		}
	}

	const handleFavoriteClick = async () => {
		await sendRequest(JSON.stringify({ workout: snapshot.id}))
		refreshFavorites()
		setSnapshot((prev: { favorite: any; }) => ({ ...prev, favorite: !prev.favorite }))
	}

	let starClasses = 'hover:w-6 hover:h-6'
	if (snapshot.favorite) {
		starClasses += ' text-green-600 text-xl'
	}

	return (
		<div
			data-tooltip-id={snapshot.id}
			key={snapshot.id}
			className="flex items-center justify-between w-full my-2 text-gray-700 hover:border-blue-300 p-4 border-2 border-transparent"
		>
		  <div className="flex justify-between items-center">
				<div className="min-w-[1em]">
					{showCheckbox && snapshot.id === leftSelected &&
						<FaRegHandPointLeft className="text-blue-600" />
					}
					{showCheckbox && snapshot.id === rightSelected &&
						<FaRegHandPointRight className="text-green-600" />
					}
				</div>
				<span className="mr-2 ml-2 cursor-pointer min-w-[2em]" onClick={handleFavoriteClick}>
					<CiStar className={starClasses} />
				</span>
				<div key="label" className="pl-2">
					{snapshot.xaxisLabel}
				</div>
			</div>
			<ColoredCircleNumber
				key="tl"
				number={snapshot.trainingLoad}
				colorClass={colorShade(snapshot.trainingLoad, 'green', 15, 60)}
			/>
			<ColoredCircleNumber
				key="ccal"
				number={snapshot.calories}
				colorClass={colorShade(snapshot.calories, 'orange', 150, 350)}
			/>
			<div key="button">
				{showCheckbox && <CheckboxSlider
					checked={checked}
					checkHandler={setChecked}
				/>}
				<Button
					onClick={() => handleSelect(snapshot, checked)}
				>
					{">>"}
				</Button>
			</div>
		</div>
	)
}
