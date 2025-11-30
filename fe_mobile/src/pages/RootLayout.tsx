import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

export default function RootLayout() {
	return (
		<>
			<NavigationBar />
			<div className="pt-14 p-4 mt-2">
				<Outlet />
			</div>
		</>
	)
}
