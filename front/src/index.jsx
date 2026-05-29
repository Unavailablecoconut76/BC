import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import BuyerDashboard from './Dashboard/BuyerDashboard';
import OfficialDashboard from './Dashboard/OfficialDashboard';
import PropertyDetailsPage from './Dashboard/PropertyDetailsPage';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from './theme/ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/property/:propertyId",
    element: <PropertyDetailsPage variant="seller" />,
  },
  {
    path: "/dashboardbuyer",
    element: <BuyerDashboard />,
  },
  {
    path: "/dashboardbuyer/property/:propertyId",
    element: <PropertyDetailsPage variant="buyer" />,
  },
  {
    path: "/dashboardofficial",
    element: <OfficialDashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
