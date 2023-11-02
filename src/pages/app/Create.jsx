import LoadingModal from "../../components/LoadingModal";
import ErrorModal from "../../components/ErrorModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../App";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
export default function Create() {
    const borderColor = "hsl(157.11, 56.72%, 26.27%)";
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [success, setSuccess] = useState(false);

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
                                        Vous avez bien créé votre événement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                                onClick={closeModal("success")}
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            >
                                Voir la liste d'événements
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const db = getFirestore();

    const closeModal = (modal) => () => {
        switch (modal) {
            case "success":
                setSuccess(false);
                navigate("/app");
                break;
            case "error":
                setShowError(false);
                break;
            default:
                break;
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (selectedOrganization == null || selectedOrganization.length === 0) {
            setError({
                message:
                    "Veuillez entrer l'organisation pour laquelle vous créez l'événement.",
            });
            setShowError(true);
            setLoading(false);
            return;
        }

        // Créer un objet Timestamp pour Firestore à partir de la date
        const eventDate = new Date(e.target.date.value);
        const timestamp = Timestamp.fromDate(eventDate);

        const informations = {
            name: e.target.name.value,
            date: timestamp, // Utiliser l'objet Timestamp
            maxGuests: parseInt(e.target.maxGuests.value), // Convertir en nombre
            description: e.target.description.value,
            address: e.target.address.value,
            created_by: userEmail, // Assurez-vous que userEmail est défini
            organization: selectedOrganization, // Assurez-vous que selectedOrganization est défini
            guests: [], // Commencer avec un tableau vide
            places: 100, // Si c'est une valeur fixe, sinon récupérez-la du formulaire
        };

        try {
            const docRef = await addDoc(collection(db, "events"), informations);
            console.log("Document written with ID: ", docRef.id);
            setSuccess(true);
        } catch (error) {
            console.error("Erreur lors de la création de l'événement:", error);
            setError(error);
            setShowError(true); // Afficher le modal d'erreur
        } finally {
            setLoading(false); // Cesser le chargement indépendamment du résultat
        }
    };

    useEffect(() => {
        const getOrganizations = async () => {
            const q = query(
                collection(db, "admins"),
                where("email", "==", userEmail)
            );

            const _querySnapshot = await getDocs(q);

            if (!userEmail) {
                console.error("L'email de l'utilisateur n'est pas défini.");
                return;
            }

            try {
                _querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("ICI => ", doc.data());
                    setOrganizations(doc.data().organizations);
                });
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des organisations:",
                    error
                );
            }
        };

        if (auth.currentUser) {
            setUserEmail(auth.currentUser.email);
            getOrganizations();
        }
        getOrganizations();
    }, [userEmail]);
    return (
        <div className="animate-in p-8 rounded-lg shadow-md w-full max-w-7xl m-auto mt-10">
            {loading && <LoadingModal />}
            {showError && (
                <ErrorModal
                    onClose={closeModal("error")}
                    errorMessage={error.message}
                />
            )}
            {success && <Modal />}
            <div className="text-xl mb-6 font-bold text-center">
                Créer un événement pour
                <div className="relative inline-block text-left ml-6">
                    <div>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                            onClick={toggleDropdown}
                        >
                            {selectedOrganization || "Options"}

                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {organizations.map((organization) => (
                                    <a
                                        key={organizations.indexOf(
                                            organization
                                        )}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                        onClick={() => {
                                            setSelectedOrganization(
                                                organization
                                            );
                                            toggleDropdown();
                                        }}
                                    >
                                        {organization}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="name"
                    >
                        Nom
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        style={{ borderColor: borderColor }}
                        type="text"
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3"
                            style={{ borderColor: borderColor }}
                            type="date"
                            id="date"
                            name="date"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            htmlFor="maxGuests"
                        >
                            Nombre d'invités maximum
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3"
                            style={{ borderColor: borderColor }}
                            type="number"
                            id="maxGuests"
                            name="maxGuests"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="border rounded w-full py-2 px-3"
                        style={{ borderColor: borderColor }}
                        id="description"
                        name="description"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="address"
                    >
                        Adresse
                    </label>
                    <textarea
                        className="border rounded w-full py-2 px-3"
                        style={{ borderColor: borderColor }}
                        id="address"
                        name="address"
                        required
                    ></textarea>
                </div>
                <button
                    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    style={{ backgroundColor: borderColor }}
                >
                    Créer
                </button>
            </form>
        </div>
    );
}
