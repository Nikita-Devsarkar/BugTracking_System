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
    LockKeyhole
} from "lucide-react";

function DeveloperDashboard() {

    const [bugs, setBugs] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});


    useEffect(() => {
        fetchAssignedBugs();
    }, []);

    const fetchAssignedBugs = async () => {

        try {

            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            console.log("USER ID:", userId);
            console.log("TOKEN:", token);

            if (!userId || !token) {
                console.error("User ID or token is missing");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/bug/developer/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("BUG DATA:", response.data);

            setBugs(response.data);

        } catch (error) {

            console.error("STATUS:", error.response?.status);
            console.error("ERROR DATA:", error.response?.data);
            console.error("ERROR:", error);

        }
    };

    const handleUpdateStatus = async (bugId) => {

        try {

            const status =
                selectedStatus[bugId] ||
                bugs.find(bug => bug.id === bugId)?.status;

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:8080/bug/${bugId}`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Bug Status Updated Successfully!");

            await fetchAssignedBugs();

        } catch (error) {

            console.error(error);

            alert("Failed to update status");

        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <Sidebar />

            <div className="ml-64 min-h-screen">

                <Topbar
                    title="Developer Dashboard"
                    subtitle="Manage your assigned bugs"
                />

                <main className="pt-[97px] px-6 pb-6">

                    <div className="mb-6">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Welcome Back! 👋
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Here's an overview of your assigned bugs.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

                        <StatsCard
                            title="Assigned Bugs"
                            count={bugs.length}
                            type="blue"
                            icon={<Bug size={24} />}
                        />

                        <StatsCard
                            title="Open"
                            count={
                                bugs.filter(
                                    bug => bug.status === "OPEN"
                                ).length
                            }
                            type="orange"
                            icon={<FolderOpen size={24} />}
                        />

                        <StatsCard
                            title="In Progress"
                            count={
                                bugs.filter(
                                    bug => bug.status === "IN_PROGRESS"
                                ).length
                            }
                            type="purple"
                            icon={<Clock3 size={24} />}
                        />

                        <StatsCard
                            title="Resolved"
                            count={
                                bugs.filter(
                                    bug => bug.status === "RESOLVED"
                                ).length
                            }
                            type="green"
                            icon={<CheckCircle size={24} />}
                        />

                        <StatsCard
                            title="Closed"
                            count={
                                bugs.filter(
                                    bug => bug.status === "CLOSED"
                                ).length
                            }
                            type="gray"
                            icon={<LockKeyhole size={24} />}
                        />

                    </div>

                </main>

            </div>

        </div>
    );
}

export default DeveloperDashboard;