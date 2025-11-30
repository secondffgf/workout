import { useState } from 'react'
import Input from './Input'

export default function TimeInput({...props}) {
	const [value, setValue] = useState('')

	const formatTime = (val: string) => {
		const digits = val.replace(/\D/g, '').slice(0, 4)
		const minutes = digits.slice(0, digits.length - 2) || '0'
		const seconds = digits.slice(-2).padStart(2, '0')
		return `${parseInt(minutes, 10)}:${seconds}`
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		if (/^\d{0,4}$/.test(raw.replace(':', '')) || /^\d{1,2}:\d{0,2}$/.test(raw)) {
			const formatted = formatTime(raw)
			const sec = parseInt(formatted.split(':')[1], 10)
			setValue(formatted)
		}
	}

	const convertResult = () => {
		const [minutes, seconds] = value.split(':').map((v) => parseInt(v || '0', 10))
		const totalSeconds = minutes * 60 + seconds
	}

	return (
		<Input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder="mm:ss"
			{...props}
		/>
	)
}
