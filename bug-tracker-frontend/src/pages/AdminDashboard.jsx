import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";

import {
    Bug,
    FolderOpen,
    Clock3,
    CheckCircle,
    LockKeyhole,
    UserPlus,
    LogOut
} from "lucide-react";

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
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:8080/bugs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setBugs(response.data);
        } catch (error) {
            console.error("Error fetching bugs:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);
            alert("Failed to load bugs");
        }
    };

    const fetchDevelopers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:8080/user/developers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setDevelopers(response.data);
            console.log("DEVELOPERS:", response.data);
        } catch (error) {
            console.error("Error fetching developers:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);
            alert("Failed to load developers");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleAssign = async (bugId) => {
        const developerId = selectedDevelopers[bugId];
        if (!developerId) {
            alert("Please select a developer");
            return;
        }
        try {

            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8080/bug/assign/${bugId}/${developerId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Developer Assigned Successfully!");

            fetchBugs();
        } catch (error) {
            console.error(error);
            alert("Failed to assign developer");
        }
    };

    const totalBugs = bugs.length;

    const openBugs = bugs.filter(
        bug => bug.status === "OPEN"
    ).length;

    const inProgressBugs = bugs.filter(
        bug => bug.status === "IN_PROGRESS"
    ).length;

    const resolvedBugs = bugs.filter(
        bug =>
            bug.status === "RESOLVED"
    ).length;

    const closedBugs = bugs.filter(
        bug => bug.status === "CLOSED"
    ).length;

    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar />
            <div className="ml-64 min-h-screen">
                <Topbar
                    title="Admin Dashboard"
                    subtitle="Manage bugs and developer assignments"
                />
                <main className="pt-[97px] px-6 pb-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                Welcome Back! 👋
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Here's an overview of your bug tracking system.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
                        <StatsCard
                            title="Total Bugs"
                            count={totalBugs}
                            type="blue"
                            icon={<Bug size={24} />}
                        />

                        <StatsCard
                            title="Open"
                            count={openBugs}
                            type="orange"
                            icon={<FolderOpen size={24} />}
                        />

                        <StatsCard
                            title="In Progress"
                            count={inProgressBugs}
                            type="purple"
                            icon={<Clock3 size={24} />}
                        />

                        <StatsCard
                            title="Resolved"
                            count={resolvedBugs}
                            type="green"
                            icon={<CheckCircle size={24} />}
                        />

                        <StatsCard
                            title="Closed"
                            count={closedBugs}
                            type="gray"
                            icon={<LockKeyhole size={24} />}
                        />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    All Bugs
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Manage bugs and assign them to developers
                                </p>
                            </div>

                            <div className="text-sm font-medium text-slate-500">
                                {bugs.length} Bugs
                            </div>
                        </div>

                        {bugs.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-4xl mb-4">
                                    🐞
                                </div>

                                <h2 className="text-xl font-semibold text-slate-800">
                                    No Bugs Found
                                </h2>

                                <p className="text-sm text-slate-500 mt-2">
                                    There are currently no bugs in the system.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Bug
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Priority
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Status
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Assigned To
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Developer
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bugs.map((bug) => (
                                            <tr
                                                key={bug.id}
                                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                                            >
                            
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {bug.title}
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1">
                                                        BUG-{bug.id}
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full
                                                        text-xs font-medium
                                                        ${
                                                            bug.priority === "CRITICAL"
                                                                ? "bg-red-50 text-red-600"
                                                                : bug.priority === "HIGH"
                                                                ? "bg-orange-50 text-orange-600"
                                                                : bug.priority === "MEDIUM"
                                                                ? "bg-yellow-50 text-yellow-600"
                                                                : "bg-emerald-50 text-emerald-600"
                                                        }`}
                                                    >
                                                        {bug.priority}
                                                    </span>
                                                </td>
                                    
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full
                                                        text-xs font-medium
                                                        ${
                                                            bug.status === "OPEN"
                                                                ? "bg-orange-50 text-orange-600"
                                                                : bug.status === "IN_PROGRESS"
                                                                ? "bg-blue-50 text-blue-600"
                                                                : bug.status === "RESOLVED"
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-slate-100 text-slate-600"
                                                        }`}
                                                    >
                                                        {bug.status}
                                                    </span>
                                                </td>
                                                
                                                <td className="px-6 py-4">
                                                    {bug.assignedUserName ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                                                <UserPlus size={16} />
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-700">
                                                                {bug.assignedUserName}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-slate-400">
                                                            Not Assigned
                                                        </span>
                                                    )}
                                                </td>
                                                
                                                <td className="px-6 py-4">
                                                    <select
                                                        disabled={bug.status === "CLOSED"}
                                                        value={
                                                            selectedDevelopers[bug.id] || ""
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedDevelopers({
                                                                ...selectedDevelopers,
                                                                [bug.id]: e.target.value
                                                            })
                                                        }
                                                        className={`border border-slate-200
                                                        rounded-lg px-3 py-2
                                                        text-sm
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-blue-100
                                                        focus:border-blue-400
                                                        ${
                                                            bug.status === "CLOSED"
                                                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                                : "bg-white text-slate-600"
                                                        }`}
                                                    >
                                                        <option value="">
                                                            Select Developer
                                                        </option>
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
                                                
                                                <td className="px-6 py-4">
                                                    <button
                                                        disabled={bug.status === "CLOSED"}
                                                        onClick={() => handleAssign(bug.id)}
                                                        className={`px-4 py-2
                                                            rounded-lg text-sm
                                                            font-medium transition
                                                            ${
                                                                bug.status === "CLOSED"
                                                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                                    : "bg-slate-900 hover:bg-slate-800 text-white"
                                                            }`}
                                                    >
                                                        {bug.status === "CLOSED" ? "Closed" : "Assign"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;