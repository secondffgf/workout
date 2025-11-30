import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import Month from './pages/Month'
import Year from './pages/Year'
import Week from './pages/Week'

const router = createBrowserRouter([
	{ path: '/', element: <RootLayout />, children: [
		{ index: true, element: <Month /> },
		{ path: 'month', element: <Month /> },
		{ path: 'year', element: <Year /> },
		{ path: 'week', element: <Week /> }
	]}
])

function App() {
  return <RouterProvider router={router} />
}

export default App
