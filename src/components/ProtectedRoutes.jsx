import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.getSession());
        supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });
    }, []);

    return session ? children : <Navigate to="/" />;
}
