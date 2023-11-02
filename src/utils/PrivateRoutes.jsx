import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LogoutButton from "../components/LogoutButton";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

export default function PrivateRoute({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const db = getFirestore();

    const checkUserStatus = async () => {
        if (!user) return;

        const q = query(
            collection(db, "admins"),
            where("email", "==", user.email)
        );
        try {
            const querySnapshot = await getDocs(q);
            setIsAdmin(!querySnapshot.empty);
        } catch (error) {
            console.error(
                "Erreur lors de la vérification du statut d'administrateur:",
                error
            );
        }
    };

    useEffect(() => {
        if (!user) {
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
