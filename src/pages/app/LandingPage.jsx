import Card from "../../components/Card";
import { useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function LandingPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const emailValue = e.target.elements.email.value;
        const passwordValue = e.target.elements.password.value;
        setEmail(emailValue);
        setPassword(passwordValue);
        const { user, error } = await supabase.auth.signUp({
            email: emailValue,
            password: passwordValue,
        });
        if (error) {
            console.error("Erreur lors de l'inscription:", error.message);
            setError(error.message);
            setShowErrorModal(true);
        } else if (user) {
            console.log("Utilisateur inscrit:", user);
        }
        setIsLoading(false); // Fin du chargement
        setShowModal(true);
    };

    const closeModal = async () => {
        setShowModal(false);
        setUser(user); // Mettez à jour l'état global de l'utilisateur ici
        navigate("/login");
    };

    const closeErrorModal = () => {
        setShowErrorModal(false); // Fonction pour fermer la modal
    };

    const Modal = () => (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Félicitations !
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm leading-5 text-gray-500">
                                        Vous avez été inscrit avec succès.
                                        Veuillez vérifier votre boîte de
                                        réception pour confirmer votre adresse
                                        e-mail.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                                onClick={closeModal}
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                                Fermer
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const LoadingModal = () => (
        <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chargement...
                    </h3>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
            </div>
        </div>
    );

    const description = (
        <div className="bg-gradient-to-r from-green-700 via-green-50 to-green-700 p-10 rounded-lg shadow-md text-gra-950">
            <h1 className="text-4xl font-bold mb-4">L'Atay Podcast</h1>
            <div className="text-lg font-medium leading-relaxed">
                <p>Nos grands Souks fédérateurs.</p>
                <p>Les Ftours incontournables.</p>
                <p>La Dar et bien plus encore !</p>
                <p>
                    Les prochains événements de L'Atay Podcast n'attendent que
                    vous !
                </p>
            </div>
        </div>
    );

    const signUpForm = (
        <div className="flex flex-col items-center justify-center">
            <div className="m-4 bg-white rounded-lg p-6 ">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">
                    Rejoins nous
                </h1>

                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1 text-start"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="64 64 896 896"
                                    fill="currentColor"
                                >
                                    {/* SVG path for user icon */}
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                className="block w-full pl-10 border rounded-md h-12 text-lg"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="mb-10">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1 text-start"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Utilisez l'état ici
                            id="password"
                            className="block w-full pl-10 border rounded-md h-12 text-lg"
                            placeholder="••••••••"
                        />

                        <label className="text-black">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />{" "}
                            {"  "}
                            Show Password
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <a
                            href="/forgot"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot password
                        </a>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center text-gray-950">
                        Déjà inscrit ?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Connecte toi !
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );

    return (
        <div className="max-h-screen w-full flex flex-col overflow-hidden">
            {isLoading && <LoadingModal />}
            {showModal && <Modal />}
            {showErrorModal && (
                <ErrorModal
                    errorMessage={errorMessage}
                    onClose={closeErrorModal}
                />
            )}
            <div className="flex flex-row items-start mt-10 w-full h-full">
                <div className="">
                    <Card title="Mon titre" content={description} />
                </div>

                <div className="w-3/4">{signUpForm}</div>
            </div>
        </div>
    );
}
