import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "./AuthContext";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

export default function AdminRoute({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const db = getFirestore();

    useEffect(() => {
        const checkUserStatus = async () => {
            if (!user) {
                navigate("/");
                return;
            }

            const q = query(
                collection(db, "admins"),
                where("email", "==", user.email)
            );
            console.log(q);
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setIsAdmin(true);
                } else {
                    navigate("/app");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la vérification du statut d'administrateur:",
                    error
                );
            }
        };

        checkUserStatus();
    }, [user, navigate]);

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
