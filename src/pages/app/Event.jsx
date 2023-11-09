import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore";

export default function Event() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availablePlaces, setAvailablePlaces] = useState(0);

    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const db = getFirestore();

    useEffect(() => {
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
        if (!user) {
            navigate("/login");
        } else {
            checkUserStatus();
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchEvent = async () => {
            const eventDocRef = doc(db, "events", id);
            try {
                const eventDocSnap = await getDoc(eventDocRef);
                if (eventDocSnap.exists()) {
                    setEvent(eventDocSnap.data());
                    setAvailablePlaces(
                        eventDocSnap.data().maxGuests -
                            eventDocSnap.data().guests.length
                    );
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
            setLoading(false);
        };

        fetchEvent();
    }, [id, db]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle event registration logic here
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading event details...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                No event found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 mx-4">
            <div className="bg-white rounded-lg shadow-md p-5 ">
                <div className="p-4 flex flex-col justify-between h-full">
                    <h2 className="text-3xl font-bold mb-2 text-black">
                        {event.name}
                    </h2>
                    <p className="text-gray-600 mt-5">
                        Organisé par : {event.organization}
                    </p>
                    <p className="text-black mt-auto">{event.description}</p>
                    <div className="mt-auto">
                        <p className="text-gray-600">
                            Invités : {event.guests.length}/{event.maxGuests}
                        </p>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col flex-grow px-8 pt-6 pb-8 bg-white rounded-lg shadow-md gap-6"
            >
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                        type="text"
                        id="nom"
                        placeholder="Votre nom"
                        required
                        className="border p-2 rounded-lg flex-grow"
                    />
                    <input
                        type="text"
                        id="prenom"
                        placeholder="Votre prénom"
                        required
                        className="border p-2 rounded-lg flex-grow mt-4 md:mt-0"
                    />
                </div>
                <input
                    type="email"
                    id="email"
                    placeholder="Votre email"
                    required
                    className="border p-2 rounded-lg w-full"
                />
                <select
                    id="places"
                    required
                    className="border p-2 rounded-lg w-full text-black"
                >
                    <option value="">Choisissez le nombre de places</option>
                    {Array.from(
                        { length: availablePlaces },
                        (_, i) => i + 1
                    ).map((place) => (
                        <option key={place} value={place}>
                            {place}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                    S'inscrire
                </button>
                <img
                    src={event.imageUrl} // Assurez-vous que 'imageUrl' est le champ correct de votre base de données
                    alt={event.name}
                    className="w-full h-64 object-contain rounded-t-lg"
                />
            </form>
        </div>
    );
}
