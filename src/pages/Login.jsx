import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useContext, useState, useEffect } from "react";
import ErrorModal from "../components/ErrorModal";
export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // [1
    const closeErrorModal = () => {
        setShowError(false); // Fonction pour fermer la modal
    };
    useEffect(() => {
        // Lorsque le composant est monté, nous ajoutons un écouteur pour les changements d'état d'authentification.
        // `supabase.auth.onAuthStateChange` est une fonction fournie par Supabase qui nous permet de réagir
        // à différents événements d'authentification, comme lorsqu'un utilisateur se connecte ou se déconnecte.
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // Lorsqu'un événement d'authentification se produit, cette fonction de rappel est appelée.

                // Si l'événement est "SIGNED_IN", cela signifie qu'un utilisateur vient de se connecter avec succès.
                if (event === "SIGNED_IN") {
                    // Nous mettons à jour l'état global de l'utilisateur avec les informations de l'utilisateur
                    // contenues dans l'objet `session`.
                    setUser(session.user);

                    // Ensuite, nous redirigeons l'utilisateur vers la page "/app".
                    navigate("/app");
                }
                // Notez que vous pouvez également gérer d'autres événements, comme "SIGNED_OUT", si nécessaire.
            }
        );

        // La fonction `useEffect` peut retourner une fonction de nettoyage qui sera exécutée lorsque le composant
        // est démonté. C'est utile pour éviter les fuites de mémoire, en particulier avec les écouteurs d'événements.
        return () => {
            // Ici, nous nous désabonnons de l'écouteur pour nous assurer qu'il ne continue pas à fonctionner
            // après que le composant a été démonté.
            authListener.subscription.unsubscribe();
        };
        // Les dépendances de `useEffect` garantissent que l'effet est exécuté une fois lorsque le composant est monté
        // et à chaque fois que `navigate` ou `setUser` change, bien que dans la pratique, ces fonctions ne devraient pas changer.
    }, [navigate, setUser]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const emailValue = e.target.elements.email.value;
        const passwordValue = e.target.elements.password.value;

        // Nous essayons de connecter l'utilisateur avec les valeurs fournies.
        const { error } = await supabase.auth.signInWithPassword({
            email: emailValue,
            password: passwordValue,
        });

        // Si une erreur se produit lors de la tentative de connexion, nous la traitons ici.
        if (error) {
            console.error("Erreur lors de la connexion:", error.message);
            setErrorMessage(error.message);
            setShowError(true);
        }
        // Si la connexion est réussie, l'écouteur d'état d'authentification (défini ci-dessus) prendra le relais
        // et gérera la mise à jour de l'état de l'utilisateur et la redirection.
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {showError && (
                <ErrorModal
                    onClose={closeErrorModal}
                    errorMessage={errorMessage}
                />
            )}
            <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-10 overflow-y-hidden">
                <form
                    className="flex flex-col w-full justify-center gap-2 text-foreground "
                    onSubmit={handleFormSubmit}
                >
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                        Sign In
                    </button>
                </form>
                <button
                    onClick={() => navigate("/")}
                    className="border border-gray-700 rounded px-4 py-2 mb-2"
                >
                    Don't have an account? Sign Up
                </button>
            </div>
        </div>
    );
}
