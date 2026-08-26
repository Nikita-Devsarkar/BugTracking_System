import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";

import {
    Bug,
    FolderOpen,
    Clock3,
    CheckCircle,
    Plus
} from "lucide-react";

function TesterDashboard() {

    const navigate = useNavigate();
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {

        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                console.error("User ID or token is missing");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/bug/tester/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("TESTER BUGS:", response.data);
            setBugs(response.data);
        } catch (error) {
            console.error("Error fetching tester bugs:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);
            alert("Failed to load bugs");
        }
    };

    const handleCloseBug = async (bugId) => {
        const confirmClose = window.confirm(
            "Are you sure you want to close this bug?"
        );

        if (!confirmClose) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8080/bug/${bugId}`,
                {
                    status: "CLOSED"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Bug Closed Successfully!");
            fetchBugs();
        } catch (error) {
            console.error("Error closing bug:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);
            alert("Failed to close bug");
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
                    title="Tester Dashboard"
                    subtitle="Monitor bugs and report new issues"
                />

                <main className="pt-[97px] px-6 pb-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                Welcome Back! 👋
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Here's an overview of your reported bugs.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/report-bug")}
                            className="
                                flex items-center gap-2
                                bg-slate-900
                                hover:bg-slate-800
                                text-white
                                px-4 py-2.5
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                            "
                        >
                            <Plus size={18} />
                            Report Bug
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
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
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Reported Bugs
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    View and verify the bugs reported by you
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
                                    You haven't reported any bugs yet.
                                </p>

                                <button
                                    onClick={() => navigate("/report-bug")}
                                    className="
                                        mt-5
                                        bg-slate-900
                                        hover:bg-slate-800
                                        text-white
                                        px-5 py-2.5
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                >
                                    Report Your First Bug
                                </button>
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
                                                Assigned Developer
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
                                                className="
                                                    border-b
                                                    border-slate-100
                                                    hover:bg-slate-50
                                                    transition
                                                "
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
                                                        className={`
                                                            inline-flex
                                                            px-3 py-1
                                                            rounded-full
                                                            text-xs
                                                            font-medium
                                                            ${
                                                                bug.priority === "CRITICAL"
                                                                    ? "bg-red-50 text-red-600"
                                                                    : bug.priority === "HIGH"
                                                                    ? "bg-orange-50 text-orange-600"
                                                                    : bug.priority === "MEDIUM"
                                                                    ? "bg-yellow-50 text-yellow-600"
                                                                    : "bg-emerald-50 text-emerald-600"
                                                            }
                                                        `}
                                                    >
                                                        {bug.priority}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`
                                                            inline-flex
                                                            px-3 py-1
                                                            rounded-full
                                                            text-xs
                                                            font-medium
                                                            ${
                                                                bug.status === "OPEN"
                                                                    ? "bg-orange-50 text-orange-600"
                                                                    : bug.status === "IN_PROGRESS"
                                                                    ? "bg-blue-50 text-blue-600"
                                                                    : bug.status === "RESOLVED"
                                                                    ? "bg-emerald-50 text-emerald-600"
                                                                    : "bg-slate-100 text-slate-600"
                                                            }
                                                        `}
                                                    >
                                                        {bug.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {bug.assignedUserName ? (
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {bug.assignedUserName}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-slate-400">
                                                            Not Assigned
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {bug.status === "RESOLVED" ? (
                                                        <button
                                                            onClick={() =>
                                                                handleCloseBug(bug.id)
                                                            }
                                                            className="
                                                                bg-slate-900
                                                                hover:bg-slate-800
                                                                text-white
                                                                px-4 py-2
                                                                rounded-lg
                                                                text-sm
                                                                font-medium
                                                                transition
                                                            "
                                                        >
                                                            Close Bug
                                                        </button>

                                                    ) : bug.status === "CLOSED" ? (
                                                        <span className="
                                                            inline-flex
                                                            px-3 py-1
                                                            rounded-full
                                                            text-xs
                                                            font-medium
                                                            bg-slate-100
                                                            text-slate-600
                                                        ">
                                                            Closed
                                                        </span>
                                                    ) : (
                                                        <span className="
                                                            text-xs
                                                            text-slate-400
                                                        ">
                                                            Waiting for Resolution
                                                        </span>
                                                    )}
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

export default TesterDashboard;