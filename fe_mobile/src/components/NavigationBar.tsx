import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		setOpen(prev => !prev)
	}

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-2">
			<div className="flex justify-between items-center p-3">
				<span className="font-bold text-lg">Workout Dashboard</span>
				<button
					className="text-lg"
					onClick={toggleOpen}
					aria-label="Toggle Menu"
				>
					☰
				</button>
			</div>
			{open && (
				<div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 flex flex-col space-y-2 p-3">
					<Link to="/week" onClick={() => setOpen(false)}>Week</Link>
					<Link to="/month" onClick={() => setOpen(false)}>Month</Link>
					<Link to="/year" onClick={() => setOpen(false)}>Year</Link>
				</div>
			)}
		</nav>
	)
}
