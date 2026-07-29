import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeveloperDashboard() {
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);
    const userId = localStorage.getItem("userId");
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        fetchAssignedBugs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    };

    const handleUpdateStatus = async (bugId) => {

        try {

            await axios.put(
                `http://localhost:8080/bug/${bugId}`,
                {
                    status: selectedStatus[bugId]
                }
            );

            alert("Bug Status Updated Successfully!");

            fetchAssignedBugs();

        } catch (error) {

            console.error(error);

            alert("Failed to update status");

        }
    };

    const fetchAssignedBugs = async () => {
        try {

            const response = await axios.get(
                `http://localhost:8080/bug/developer/${userId}`
            );

            setBugs(response.data);

            console.log(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load assigned bugs");

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">
                    Developer Dashboard
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
                        <th className="border p-2">Change Status</th>
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
                                <select
                                    value={selectedStatus[bug.id] || bug.status}
                                    onChange={(e) =>
                                        setSelectedStatus({
                                            ...selectedStatus,
                                            [bug.id]: e.target.value
                                        })
                                    }
                                    className="border p-1 rounded"
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleUpdateStatus(bug.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default DeveloperDashboard;