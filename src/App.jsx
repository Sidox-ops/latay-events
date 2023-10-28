import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import AuthRedirection from "./components/AuthRedirection";
import Core from "./components/Core";
import Create from "./pages/app/Create";

export const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AuthRedirection>
                    <div>Hello world!</div>
                </AuthRedirection>
            ),
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/create",
            element: <Create />,
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedRoutes>
                    <Core />
                </ProtectedRoutes>
            ),
        },
    ]);

    useEffect(() => {
        console.log(supabase);
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
