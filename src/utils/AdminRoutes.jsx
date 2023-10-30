import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }) {
    const { user, isInitialized } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkUserStatus = async () => {
            if (isInitialized && !user) {
                navigate("/login");
                return;
            }

            const { data, error } = await supabase
                .from("admin")
                .select("*")
                .eq("user_mail", user.email);

            if (error) {
                console.error(
                    "Erreur lors de la vérification du statut d'administrateur:",
                    error.message
                );
                return;
            }

            if (data.length > 0) {
                setIsAdmin(true);
            } else {
                navigate("/app");
            }
        };

        checkUserStatus();
    }, [user, navigate]);

    if (!isAdmin) return null;

    return children;
}
