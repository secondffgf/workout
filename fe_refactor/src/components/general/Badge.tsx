import { type CurrentPeriodState, CurrentPeriodContext } from '@/context/CurrentPeriodContextProvider'
import { useContext } from "react"
import { SlBadge } from 'react-icons/sl';

const greenShades = [
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
];

function colorShade(num: number | undefined, min: number, max: number) {
    let colors = greenShades
    if (num === undefined || num == null) return colors[0]
    if (num <= min) return colors[0]
    if (num >= max) return colors[colors.length - 1]
    const ratio = (num - min) / (max - min)
    const index = Math.floor(ratio * (colors.length - 1))
    return colors[index]
}

const caloriesGoal = 1950

export default function Badge({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { state }: { state: CurrentPeriodState } = useContext(CurrentPeriodContext);

  let classes = 'w-10 h-10 text-white p-2 rounded '
  const calories = state?.statistics?.calories ?? 0
  classes += colorShade(calories, 200, caloriesGoal)
  const percentage = Math.round(calories / caloriesGoal * 100)
  
  return (
    <div {...props} title={`${percentage}% achieved this week`}>
      <SlBadge
        className={classes}
      />
     </div>
  )
}