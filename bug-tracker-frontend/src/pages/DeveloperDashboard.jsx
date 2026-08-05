import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";

import {
    Bug,
    FolderOpen,
    Clock3,
    CheckCircle
} from "lucide-react";

function DeveloperDashboard() {

    const [bugs, setBugs] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchAssignedBugs();
    }, []);

    const fetchAssignedBugs = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/bug/developer/${userId}`
            );

            setBugs(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load assigned bugs");

        }
    };


    const handleUpdateStatus = async (bugId) => {

        try {

            const status =
                selectedStatus[bugId] ||
                bugs.find(bug => bug.id === bugId)?.status;

            await axios.put(
                `http://localhost:8080/bug/${bugId}`,
                {
                    status: status
                }
            );

            alert("Bug Status Updated Successfully!");

            fetchAssignedBugs();

        } catch (error) {

            console.error(error);

            alert("Failed to update status");

        }
    };


    return (
        <div className="min-h-screen bg-slate-100 flex">

            <Sidebar />

            <div className="flex-1">
                <Topbar
                    title="Developer Dashboard"
                    subtitle="Manage your assigned bugs"
                />

                <main className="p-6">

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Welcome Back! 👋
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Here's an overview of your assigned bugs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <StatsCard
                            title="Assigned Bugs"
                            count={bugs.length}
                            type="blue"
                            icon={<Bug size={24} />}
                        />

                        <StatsCard
                            title="Open"
                            count={bugs.filter(bug => bug.status === "OPEN").length}
                            type="orange"
                            icon={<FolderOpen size={24} />}
                        />

                        <StatsCard
                            title="In Progress"
                            count={bugs.filter(bug => bug.status === "IN_PROGRESS").length}
                            type="purple"
                            icon={<Clock3 size={24} />}
                        />

                        <StatsCard
                            title="Resolved"
                            count={bugs.filter(bug => bug.status === "RESOLVED").length}
                            type="green"
                            icon={<CheckCircle size={24} />}
                        />

                    </div>

                </main>

            </div>

        </div>
    );
}

export default DeveloperDashboard;