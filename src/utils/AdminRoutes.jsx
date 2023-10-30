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
            if (isInitialized || !user) {
                navigate("/");
                return;
            }

            const { data: admin, error } = await supabase
                .from("admin")
                .select("user_mail")
                .eq("user_mail", user.email);

            console.log("ADMIN", admin);
            if (error) {
                console.error(
                    "Erreur lors de la vérification du statut d'administrateur:",
                    error.message
                );
                return;
            }

            if (admin.length > 0) {
                setIsAdmin(true);
            } else {
                navigate("/app");
            }
        };

        checkUserStatus();
    }, [user, navigate, isInitialized]);

    if (!isAdmin) return null;

    return children;
}
