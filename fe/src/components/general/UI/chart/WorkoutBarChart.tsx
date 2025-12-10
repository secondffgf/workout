import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
	ResponsiveContainer
} from 'recharts'
import CustomizedMonthlyTooltip from './CustomizedMonthlyTooltip'
import CustomizedYearlyTooltip from './CustomizedYearlyTooltip'

const WorkoutBarChart = ({
	payload,
	onBarClick,
	domain = [0, 40],
	ticks = [0, 10, 15, 20, 25, 30, 35],
	isYear,
	legendFormatter = (value) => 'Training Time',
	fillColor = "#74d4ff",
	dataKey = "value",
	tickFormatter = (value) => value
}) => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={payload} margin={{ top: 20 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="label" />
				<YAxis
					domain={domain}
					ticks={ticks}
					interval={0}
					tickFormatter={tickFormatter}
				/>
				<Tooltip
					content={isYear ? <CustomizedYearlyTooltip />
					: <CustomizedMonthlyTooltip />}
				/>
				<Legend
					formatter={legendFormatter}
				/>
				<Bar
					dataKey={dataKey}
					fill={fillColor}
					barSize={10}
					onClick={onBarClick}
					cursor="pointer"
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default WorkoutBarChart;
