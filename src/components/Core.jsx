import { useEffect, useState, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Core({ children }) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getSession();
            console.log(data);
            if (error) console.log(error);
            else setUser(data.session.user);
        };
        getUser();
    }, []);

    return (
        <>
            <main className="min-h-screen flex flex-col items-center">
                {children}
            </main>
        </>
    );
}
