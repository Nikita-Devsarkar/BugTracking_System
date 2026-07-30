import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TesterDashboard() {
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        fetchBugs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    };

    const fetchBugs = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8080/bug/tester/${userId}`
            );

            setBugs(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load bugs");

        }
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

            <div className="mt-8 w-11/12">

                <table className="w-full border border-gray-400">

                    <thead className="bg-gray-300">

                        <tr>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Priority</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Assigned Developer</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bugs.map((bug) => (

                            <tr key={bug.id}>

                                <td className="border p-2">{bug.title}</td>

                                <td className="border p-2">{bug.priority}</td>

                                <td className="border p-2">{bug.status}</td>

                                <td className="border p-2">
                                    {bug.assignedUserName || "Not Assigned"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default TesterDashboard;