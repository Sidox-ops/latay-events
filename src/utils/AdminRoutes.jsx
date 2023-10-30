import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }) {
    const { user, isInitialized } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminChecked, setIsAdminChecked] = useState(false); // 1. Ajout de l'état isAdminChecked

    useEffect(() => {
        const checkUserStatus = async () => {
            if (isInitialized && !user) {
                navigate("/");
                return;
            }

            const { data: admin, error } = await supabase
                .from("admin")
                .select("user_mail")
                .eq("user_mail", user?.email);
            setIsAdminChecked(true); // 2. On met à jour l'état isAdminChecked
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
                if (isAdminChecked) {
                    navigate("/app");
                }
            }
        };

        checkUserStatus();
    }, [user, navigate, isInitialized]);

    if (!isAdmin) return null;

    return (
        <>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                    <div className="flex items-center gap-4">
                        Hey, {user.email}!
                        <LogoutButton />
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    navigate("/create");
                                }}
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Créer un événement
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}
