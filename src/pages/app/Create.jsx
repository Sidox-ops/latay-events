import { supabase } from "../../App";
import { useEffect, useState } from "react";
export default function Create() {
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const borderColor = "hsl(157.11, 56.72%, 26.27%)";
    const handleSubmit = async (e) => {
        e.preventDefault();

        const informations = {
            name: e.target.name.value,
            date: e.target.date.value,
            maxGuests: e.target.maxGuests.value,
            description: e.target.description.value,
            address: e.target.address.value,
        };

        const { data, error } = await supabase.from("events").insert([
            {
                created_by: userEmail,
                informations: informations,
            },
        ]);

        if (error) {
            console.error("Erreur lors de la création de l'événement:", error);
        } else {
            console.log("Événement créé avec succès:", data);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) console.log(error);
            else {
                setUserEmail(data.session.user.email);
                setOrganizations(data.session.user.organization);
            }
            console.log(organizations);
        };
        getUser();
    }, [userEmail]);
    return (
        <div className="animate-in p-8 rounded-lg shadow-md w-full max-w-7xl mt-10">
            <h2 className="text-2xl mb-6 font-bold text-center">
                Créer un événement pour {userEmail}
            </h2>
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
