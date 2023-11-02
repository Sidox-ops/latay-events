import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function LogoutButton() {
    const navigate = useNavigate();
    const auth = getAuth();
    const signOut = async () => {
        const { error } = await auth.signOut();
        if (error) console.log(error);
        navigate("/");
    };
    return (
        <button
            onClick={signOut}
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
            Logout
        </button>
    );
}
