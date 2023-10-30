import { supabase } from "../../App";
import { useEffect, useState } from "react";
export default function Create() {
    const borderColor = "hsl(157.11, 56.72%, 26.27%)";
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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

    const getOrganizations = async () => {
        const { data: admin, error } = await supabase
            .from("admin")
            .select("organization")
            .eq("user_mail", userEmail)
            .single();
        console.log(admin);
        setOrganizations(admin.organization);
    };

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) console.log(error);
            else setUserEmail(data.session.user.email);
        };
        getUser();
        getOrganizations();
    }, [userEmail]);
    return (
        <div className="animate-in p-8 rounded-lg shadow-md w-full max-w-7xl m-auto mt-10">
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
