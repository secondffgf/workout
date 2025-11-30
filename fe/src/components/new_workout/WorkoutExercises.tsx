import { useRef, useState } from 'react'
import useHttp from '@/hooks/useHttp'
import Button from 'components/general/UI/Button'
import Modal from 'components/general/UI/Modal'
import Exercise from 'components/new_workout/Exercise'
import Input from 'components/general/UI/Input'

const requestConfig = {}

export default function WorkoutExercises({templateWorkout}) {
	const [commonWeight, setCommonWeight] = useState({ isSame: false, value: 0 })
	const [exercises, setExercises] = useState({date: '', list: []})
	const commonWeightInput = useRef({})
	const modal = useRef({})
	const {
		data: exerciseNames,
		error: namesError
	} = useHttp(
		'http://localhost/api/exercises',
		requestConfig,
		[]
	)

	function handleSameWeightChange(event) {
		if (event.target.checked) {
			modal.current.open()
			commonWeightInput.current?.focus()
		}
		setCommonWeight((prev) => { return { isSame: event.target.checked, value: prev.value }})
	}

	function addExcercise(e) {
		e.preventDefault()
		setExercises((prev) => {
			let id = prev.list.length === 0 ? 0 : prev.list[prev.list.length - 1].id + 1
			return {
			  ...prev,
				list: [ ...prev.list, {
			  	id: id,
			  	nameValue: "",
			  	weightValue: commonWeight.isSame ? commonWeight.value : ""
			  }]
			}
		})
	}

	if (templateWorkout?.exercises && templateWorkout.date !== exercises.date) {
		const newExercises = templateWorkout.exercises.map((e, index) => {
			return {
				id: index,
				nameValue: e.exercise,
				weightValue: e.weight
			}})
		setExercises({ date: templateWorkout.date, list: newExercises })
	}

	const handleCreateName = (value, id) => {
		const newOption = { value : value, label: value }
		setExerciseNames(prev => [...prev, newOption])
		setExercises((prev) => {
		  return { ...prev, list: prev.list.map((item) => 
				item.id === id ? { ...item, nameValue: nameValue } : item
			)}}
		)
	}

	const handleChangeName = (value, id) => {
		var nameValue = value === null ? '' : value.label
		setExercises((prev) => {
		  return { ...prev, list: prev.list.map((item) => 
				item.id === id ? { ...item, nameValue: nameValue } : item
			)}}
		)
	}

	const handleChangeWeight = (id, value) => {
		setExercises((prev) => {
		  return { ...prev, list: prev.list.map((item) => 
				item.id === id ? { ...item, weightValue: value } : item
			)}}
		)
	}

	function useCommonWeight(e) {
		e.preventDefault()
		const weight = parseInt(commonWeightInput.current.value, 10)
		modal.current.close()
		var weightValue = Number.isInteger(weight) ? weight : 0
		setCommonWeight((prev) => { return { isSame: prev.isSame, value: weightValue }})
		commonWeightInput.current.value = ''
		setExercises((prev) => {
		  return { ...prev, list: prev.list.map((item) => {
			  return { ...item, weightValue: weightValue }})}
		})
	}

	function handleCancelExercise(e, id) {
		e.preventDefault()
		setExercises((prev) => {
			const list = prev.list.reduce((acc, ex) => {
				if (ex.id !== id) {
					acc.push({...ex, id: acc.length})
				}
				return acc
			}, [])
			return { ...prev, list }
		})
	}

	function cancelCommonWeight(e) {
		e.preventDefault()
		modal.current.close()
		setCommonWeight(() => { return { isSame: false, value: 0 }})
		commonWeightInput.current.value = ''
		setExercises((prev) =>  {
		  return { ...prev, list: prev.list.map((item) => 
				{ return { ...item, weightValue: '' }})}})
	}

	if (namesError) {
		return <Error title="Failed to fetch exercise names" message={namesError} />
	}

	return (
		<>
			<Modal
				ref={modal}
				onOk={useCommonWeight}
				onCancel={cancelCommonWeight}
			>
				<h2 className="text-xl font-bold text-stone-700 my-4">
					What weight to use?
				</h2>
				<div className="m-4">
					<Input
						name="commonWeight"
						label="Weight"
						width="w-1/4"
						ref={commonWeightInput}
					 />	
				</div>
			</Modal>
			<div className="flex items-center justify-end gap-4 my-4">
				<input
					type="checkbox"
					id="sameWeight"
					checked={commonWeight.isSame}
					onChange={handleSameWeightChange}
					className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-2 focus-ring-sky-400"
				/>
				<label htmlFor="sameWeight" className="text-stone-500">
					Should use same weight
				</label>
				<Button
					onClick={addExcercise}
				>
					Add Exercise
				</Button>
			</div>
			{exercises.list.map((input, index) => {
				return (
					<Exercise
						key={input.id}
						nameOptions={exerciseNames}
						nameValue={exerciseNames.find(name => name.label === input.nameValue)}
						weightValue={commonWeight.isSame ? commonWeight.value : input.weightValue}
						handleChangeName={handleChangeName}
						handleCreateName={handleCreateName}
						onChangeWeight={handleChangeWeight}
						disabled={commonWeight.isSame}
						input={input}
						handleCloseExercise={handleCancelExercise}
					/>
				)
			})}
		</>
	)
}
