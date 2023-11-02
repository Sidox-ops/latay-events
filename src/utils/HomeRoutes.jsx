import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function HomeRoutes({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/app");
        }
    }, [user, navigate]);
}
