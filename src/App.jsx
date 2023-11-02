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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebase";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

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
