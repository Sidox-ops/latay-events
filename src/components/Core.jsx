export default function Core({ children }) {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                        {user ? (
                            <div className="flex items-center gap-4">
                                Hey, {user.email}!
                                <LogoutButton />
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
                {children}
            </main>
        </>
    );
}
