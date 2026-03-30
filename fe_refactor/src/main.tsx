
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import MonthPage, { loader as monthDataLoader } from './pages/MonthPage.tsx';
import WeekPage from './pages/WeekPage.tsx';
import YearPage from './pages/YearPage.tsx';
import AllPage from './pages/AllPage.tsx';
import Favorite from './pages/Favorite.tsx';
import Flagged from './pages/Flagged.tsx';
import NewWorkoutPage from './pages/NewWorkoutPage.tsx';
import SearchAndCompare from './pages/SearchAndCompare.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'month',
        element: <MonthPage />,
        loader: monthDataLoader
      },
      { path: 'week', element: <WeekPage /> },
      { path: 'year', element: <YearPage /> },
      { path: 'month', element: <MonthPage /> },
      { path: 'all', element: <AllPage /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'flagged', element: <Flagged /> },
      { path: 'new', element: <NewWorkoutPage /> },
      { path: 'search', element: <SearchAndCompare /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
