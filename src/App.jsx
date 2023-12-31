import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Create from "./pages/app/Create";
import LandingPage from "./pages/app/LandingPage";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebase";
import { getAuth } from "firebase/auth";
import Dashboard from "./pages/app/Dashboard";
import HomeRoutes from "./utils/HomeRoutes";
import Event from "./pages/app/Event";

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
            element: (
                <HomeRoutes>
                    <LandingPage />
                </HomeRoutes>
            ),
        },
        {
            path: "/login",
            element: (
                <HomeRoutes>
                    <Login />
                </HomeRoutes>
            ),
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
                <PrivateRoute banner>
                    <Dashboard />
                </PrivateRoute>
            ),
        },
        {
            path: "/event/:id",
            element: (
                <PrivateRoute banner={false}>
                    <Event />
                </PrivateRoute>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
