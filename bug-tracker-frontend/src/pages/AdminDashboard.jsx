import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [selectedDevelopers, setSelectedDevelopers] = useState({});

    useEffect(() => {
        fetchBugs();
        fetchDevelopers();
    }, []);

    const fetchBugs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bugs");
            setBugs(response.data);
        } catch (error) {
            console.error("Error fetching bugs:", error);
            alert("Failed to load bugs");
        }
    };

    const fetchDevelopers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user/developers"
            );

            setDevelopers(response.data);

            console.log(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to load developers");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    };

    const handleAssign = async (bugId) => {

        const developerId = selectedDevelopers[bugId];

        if (!developerId) {
            alert("Please select a developer");
            return;
        }

        try {

            await axios.put(
                `http://localhost:8080/bug/assign/${bugId}/${developerId}`
            );

            alert("Developer Assigned Successfully!");

            fetchBugs();

        } catch (error) {

            console.error(error);

            alert("Failed to assign developer");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            <table className="w-full border border-collapse bg-white">

                <thead className="bg-gray-200">

                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Priority</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Assigned To</th>
                        <th className="border p-2">Select Developer</th>
                        <th className="border p-2">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {bugs.map((bug) => (

                        <tr key={bug.id}>

                            <td className="border p-2">{bug.id}</td>

                            <td className="border p-2">{bug.title}</td>

                            <td className="border p-2">{bug.priority}</td>

                            <td className="border p-2">{bug.status}</td>

                            <td className="border p-2">
                                {bug.assignedUserName || "Not Assigned"}
                            </td>

                            <td className="border p-2">
                                <select
                                    value={selectedDevelopers[bug.id] || ""}
                                    onChange={(e) =>
                                        setSelectedDevelopers({
                                            ...selectedDevelopers,
                                            [bug.id]: e.target.value
                                        })
                                    }
                                    className="border p-1 rounded"
                                >
                                    <option value="">Select Developer</option>

                                    {developers.map((developer) => (
                                        <option
                                            key={developer.id}
                                            value={developer.id}
                                        >
                                            {developer.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="border p-2">
                                <button
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleAssign(bug.id)}
                                >
                                    Assign
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdminDashboard;