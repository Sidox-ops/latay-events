import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import ErrorModal from "../components/ErrorModal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../App";

export default function Login() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const closeErrorModal = () => {
        setShowError(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const emailValue = e.target.elements.email.value;
        const passwordValue = e.target.elements.password.value;

        try {
            await signInWithEmailAndPassword(auth, emailValue, passwordValue);
            navigate("/app");
        } catch (error) {
            console.error("Erreur lors de la connexion:", error.message);
            setErrorMessage(error.message);
            setShowError(true);
        }
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
