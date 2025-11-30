import { useContext } from 'react'
import { CurrentPeriodContext } from '@/context/CurrentPeriodContextProvider'

const ProgressBar = () => {
	const { state } = useContext(CurrentPeriodContext)

  const percentage = Math.round(state.monthCalories / 7700 * 100)
	return (
	  <div className="mt-4" title="Month Progress">
			<div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">
				<div
					className="bg-green-500 h-full transition-all duration-300 flex items-center justify-center text-lg font-bold text-white"
					style={{ width: `${percentage}%` }}
				>
					{percentage}%
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
