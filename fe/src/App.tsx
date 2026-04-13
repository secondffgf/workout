import { Outlet } from 'react-router-dom';
import NavigationSidebar from './components/NavigationSidebar';
import WorkoutCalendar from './components/WorkoutCalendar';
import CaloriesEstimateChart from './components/general/UI/chart/CaloriesEstimateChart';
import ProgressBar from '@/components/ProgressBar'
import { CalendarContextProvider } from '@/context/CalendarContextProvider';
import { FirstWorkoutContextProvider } from '@/context/FirstWorkoutContextProvider';
import { CurrentPeriodContextProvider } from '@/context/CurrentPeriodContextProvider';
import Badge from '@/components/general/UI/Badge';

function App() {
  return (
    <main className="py-4 flex w-full h-[100vh]">
		<CurrentPeriodContextProvider>
		<FirstWorkoutContextProvider>
		<CalendarContextProvider>
			<div className="flex min-h-0 flex-shrink-0 self-stretch">
				<NavigationSidebar />
			</div>
			<div className="relative mr-4 flex min-h-0 w-[40rem] flex-1 flex-col">
				<Outlet />
				<div className="absolute top-0 right-6">
					<Badge />
				</div>
			</div>
			<div className="flex-1">
				<WorkoutCalendar />
				<CaloriesEstimateChart />
				<ProgressBar />
			</div>
		</CalendarContextProvider>
		</FirstWorkoutContextProvider>
		</CurrentPeriodContextProvider>
    </main>
  );
}
	
export default App;
