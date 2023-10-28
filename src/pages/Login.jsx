import { supabase } from "../utils/supabaseClient";
export default function Login() {
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const emailValue = e.target.elements.email.value;
        const passwordValue = e.target.elements.password.value;

        const { user, error } = await supabase.auth.signInWithPassword({
            email: emailValue,
            password: passwordValue,
        });

        if (error) {
            console.error("Erreur lors de la connexion:", error.message);
        } else if (user) {
            console.log("Utilisateur connecté:", user);
        }
    };
    return (
        <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-10 overflow-y-hidden">
            <form
                className="flex flex-col w-full justify-center gap-2 text-foreground "
                onSubmit={handleFormSubmit}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                    Sign In
                </button>
                <button
                    formAction="/auth/sign-up"
                    className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
