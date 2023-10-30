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
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                        <div className="flex items-center gap-4">
                            Hey, {user.email}!
                            <LogoutButton />
                            <button
                                onClick={() => {
                                    navigate("/create");
                                }}
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                /create
                            </button>
                        </div>
                    </div>
                </nav>
                {children}
            </main>
        </>
    );
}
