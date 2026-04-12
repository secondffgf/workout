import { App as AntdApp, ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import MonthPage, { loader as monthDataLoader } from './pages/MonthPage.tsx';
import WeekPage, { loader as weekDataLoader } from './pages/WeekPage.tsx';
import YearPage from './pages/YearPage.tsx';
import AllPage from './pages/AllPage.tsx';
import Favorite, { loader as favoriteLoader } from './pages/Favorite.tsx';
import Flagged, { loader as flaggedLoader } from './pages/Flagged.tsx';
import NewWorkoutPage, { loader as newWorkoutLoader } from './pages/new_workout/NewWorkoutPage.tsx';
import SearchAndCompare from './pages/SearchAndCompare.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/month" replace /> },
      {
        path: 'month',
        element: <MonthPage />,
        loader: monthDataLoader
      },
      {
        path: 'week',
        element: <WeekPage />,
        loader: weekDataLoader,
      },
      { path: 'year', element: <YearPage /> },
      { path: 'month', element: <MonthPage /> },
      { path: 'all', element: <AllPage /> },
      { path: 'favorite', element: <Favorite />, loader: favoriteLoader },
      { path: 'flagged', element: <Flagged />, loader: flaggedLoader },
      { path: 'add', element: <NewWorkoutPage />, loader: newWorkoutLoader },
      { path: 'search', element: <SearchAndCompare /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
