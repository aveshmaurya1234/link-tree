import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Analytics from "../pages/Analytics";
import PublicProfile from "../pages/PublicProfile";

import PublicRoute from "../layout/PublicRoute";
import ProtectedRoute from "../layout/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";



const router = createBrowserRouter([
    // Public Pages
    {
        path: "/",
        element: <Home />,
    },
    {
        element: <PublicRoute />,
        children: [
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
        ],
    },

    // Protected Pages
    {
        element: <ProtectedRoute />,
        children: [
        {
            element: <DashboardLayout />,
            children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/analytics",
                element: <Analytics />,
            },
            ]
        }
        ],
    },

    // Public Linktree Page
    {
        path: "/:username",
        element: <PublicProfile />,
    },
]);

export default router;