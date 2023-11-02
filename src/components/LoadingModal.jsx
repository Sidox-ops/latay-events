export default function LoadingModal() {
    <div className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chargement...
                </h3>
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
            </div>
        </div>
    </div>;
}
