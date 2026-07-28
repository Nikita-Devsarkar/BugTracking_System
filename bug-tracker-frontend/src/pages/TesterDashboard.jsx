import { useNavigate } from "react-router-dom";

function TesterDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">
                Tester Dashboard
            </h1>

            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 mb-4">
                Logout
            </button>

            <button onClick={() => navigate("/report-bug")} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Report Bug
            </button>
        </div>
    );
}

export default TesterDashboard;