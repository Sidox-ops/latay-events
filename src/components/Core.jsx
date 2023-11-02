import { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Core({ children }) {
    const { user, loading } = useAuth(); // Ajouter 'user' ici

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Ou un composant de chargement personnalisé
    }

    return (
        <main className="min-h-screen flex flex-col items-center">
            {children}
        </main>
    );
}
