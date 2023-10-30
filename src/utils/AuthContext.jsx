import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    session: null,
    signOut: () => {},
    isInitialized: false,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const currentSession = supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
                setUser(session?.user);
            }
        );

        setIsInitialized(true);

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                signOut: () => supabase.auth.signOut(),
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
