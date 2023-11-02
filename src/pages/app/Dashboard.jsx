import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        } else {
            const fetchEvents = async () => {
                const eventsCollection = collection(db, "events");
                const eventsSnapshot = await getDocs(eventsCollection);
                const eventsList = eventsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsList);
            };

            fetchEvents().catch(console.error);
        }
    }, [user, loading, navigate, db]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="min-h-screen flex flex-col items-center mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <img
                            src={event.imageUrl} // Assurez-vous que 'imageUrl' est le champ correct de votre base de données
                            alt={event.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">
                                {event.name}
                            </h2>
                            <p className="text-gray-700">{event.description}</p>
                            <p className="text-gray-600">{event.address}</p>
                            <p className="text-gray-600">
                                {new Date(
                                    event.date.seconds * 1000
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                Organisé par : {event.organization}
                            </p>
                            <p className="text-gray-600">
                                Invités : {event.guests.length}/
                                {event.maxGuests}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
