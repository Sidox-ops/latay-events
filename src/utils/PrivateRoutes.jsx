import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
    const { user, isInitialized } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialized && !user) {
            navigate("/login");
        } else {
            console.log("ICI", user);
        }
    }, [user, navigate]);

    if (!user) return null;

    return children;
}
