import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import Login from "./pages/Login";
import Core from "./components/Core";
import Create from "./pages/app/Create";
import LandingPage from "./pages/app/LandingPage";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminRoutes";

export const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

function AppContent() {
    const { user } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/create",
            element: (
                <AdminRoutes>
                    <Create />
                </AdminRoutes>
            ),
        },
        {
            path: "/app",
            element: (
                <PrivateRoute>
                    <Core />
                </PrivateRoute>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
