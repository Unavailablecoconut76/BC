import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import BuyerDashboard from './Dashboard/BuyerDashboard';
import OfficialDashboard from './Dashboard/OfficialDashboard';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboardbuyer',
    element: <BuyerDashboard />,
  },
  {
    path: '/dashboardofficial',
    element: <OfficialDashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar={false} />
  </React.StrictMode>
);

reportWebVitals();
