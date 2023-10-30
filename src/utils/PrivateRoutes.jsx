import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LogoutButton from "../components/LogoutButton";
import { supabase } from "./supabaseClient";
export default function PrivateRoute({ children }) {
    const { user, isInitialized } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const checkUserStatus = async () => {
        const { data: admin, error } = await supabase
            .from("admin")
            .select("user_mail")
            .eq("user_mail", user?.email);

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
            console.log("NOT ADMIN");
        }
    };

    useEffect(() => {
        if (isInitialized && !user) {
            navigate("/login");
        } else {
            checkUserStatus();
        }
    }, [user, navigate]);

    if (!user) return null;

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
