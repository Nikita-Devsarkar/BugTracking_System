import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AssignedBugs() {

    const [bugs, setBugs] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [selectedBug, setSelectedBug] = useState(null);

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

            await axios.put(
                `http://localhost:8080/bug/${bugId}`,
                {
                    status:
                        selectedStatus[bugId] ||
                        bugs.find(b => b.id === bugId)?.status
                }
            );

            alert("Bug Status Updated Successfully!");

            fetchAssignedBugs();

        } catch (error) {

            console.error(error);
            alert("Failed to update status");

        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("ALL");
        setPriorityFilter("ALL");
    };

    const filteredBugs = bugs.filter((bug) => {
        const matchesSearch =
            bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bug.id.toString().includes(searchTerm);

        const matchesStatus =
            statusFilter === "ALL" ||
            bug.status === statusFilter;

        const matchesPriority =
            priorityFilter === "ALL" ||
            bug.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <Sidebar />
            <div className="flex-1">
                <Topbar
                    title="Assigned Bugs"
                    subtitle="Review and manage your assigned bugs"
                />
                <main className="p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Assigned Bugs
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Bugs currently assigned to you
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-200">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Your Assigned Bugs
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Review and update the status of your bugs
                                </p>
                            </div>

                            <div className="text-sm font-medium text-slate-500">
                                {filteredBugs.length} Bugs
                            </div>
                        </div>

                        <div className="px-6 py-5 border-b border-slate-200 flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search bugs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg
                                    px-4 py-2.5 text-sm
                                    focus:outline-none focus:ring-2
                                    focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-slate-200 rounded-lg
                                px-4 py-2.5 text-sm text-slate-600 bg-white
                                focus:outline-none focus:ring-2
                                focus:ring-blue-100"
                            >
                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="OPEN">
                                    Open
                                </option>

                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>

                                <option value="RESOLVED">
                                    Resolved
                                </option>

                                <option value="CLOSED">
                                    Closed
                                </option>
                            </select>
                            
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="border border-slate-200 rounded-lg
                                px-4 py-2.5 text-sm text-slate-600 bg-white
                                focus:outline-none focus:ring-2
                                focus:ring-blue-100"
                            >
                                <option value="ALL">
                                    All Priority
                                </option>

                                <option value="LOW">
                                    Low
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="HIGH">
                                    High
                                </option>

                                <option value="CRITICAL">
                                    Critical
                                </option>
                            </select>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2.5 text-sm font-medium
                                text-slate-600 border border-slate-200
                                rounded-lg hover:bg-slate-50 transition"
                            >
                                Clear Filters
                            </button>
                        </div>

                        {filteredBugs.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-4xl mb-4">
                                    🔍
                                </div>
                                <h2 className="text-xl font-semibold text-slate-800">
                                    {bugs.length === 0
                                        ? "No Bugs Assigned"
                                        : "No Matching Bugs"
                                    }
                                </h2>
                                <p className="text-sm text-slate-500 mt-2">
                                    {bugs.length === 0
                                        ? "You currently don't have any bugs assigned to you."
                                        : "Try changing your search or filter criteria."
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    {/* Table Header */}
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Bug
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Category
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Priority
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Status
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Due Date
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Updated
                                            </th>

                                            <th className="text-left px-6 py-4 font-semibold text-slate-500 uppercase text-xs">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredBugs.map((bug) => (
                                            <tr
                                                key={bug.id}
                                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                                            >
                                                {/* Bug */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {bug.title}
                                                    </div>

                                                    <div className="text-xs text-slate-400 mt-1">
                                                        BUG-{bug.id}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                                                        {bug.category}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
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
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
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

                                                <td className="px-6 py-4 text-slate-500">
                                                    {bug.dueDate
                                                        ? new Date(
                                                            bug.dueDate
                                                        ).toLocaleDateString()
                                                        : "No due date"
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-slate-500">
                                                    {bug.updatedAt
                                                        ? new Date(
                                                            bug.updatedAt
                                                        ).toLocaleDateString()
                                                        : "-"
                                                    }
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">

                                                        <button
                                                            onClick={() => setSelectedBug(bug)}
                                                            className="px-4 py-2 rounded-lg text-sm font-medium
                                                            border border-slate-200 text-slate-700
                                                            hover:bg-slate-50 transition"
                                                        >
                                                            View
                                                        </button>

                                                        <select
                                                            value={
                                                                selectedStatus[bug.id] ||
                                                                bug.status
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedStatus({
                                                                    ...selectedStatus,
                                                                    [bug.id]:
                                                                        e.target.value
                                                                })
                                                            }
                                                            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                        >
                                                            <option value="OPEN">
                                                                OPEN
                                                            </option>

                                                            <option value="IN_PROGRESS">
                                                                IN_PROGRESS
                                                            </option>

                                                            <option value="RESOLVED">
                                                                RESOLVED
                                                            </option>

                                                            <option value="CLOSED">
                                                                CLOSED
                                                            </option>
                                                        </select>

                                                        <button
                                                            onClick={() =>
                                                                handleUpdateStatus(
                                                                    bug.id
                                                                )
                                                            }
                                                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
                
                {selectedBug && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase">
                                        BUG-{selectedBug.id}
                                    </p>

                                    <h2 className="text-xl font-semibold text-slate-800 mt-1">
                                        {selectedBug.title}
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setSelectedBug(null)}
                                    className="text-slate-400 hover:text-slate-700 text-2xl"
                                >
                                    ×
                                </button>

                            </div>


                            {/* Modal Body */}
                            <div className="px-6 py-6 space-y-6">

                                {/* Description */}
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 mb-2">
                                        Description
                                    </p>

                                    <p className="text-sm text-slate-600 leading-6">
                                        {selectedBug.description}
                                    </p>
                                </div>


                                {/* Information Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Category
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.category}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Priority
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.priority}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Status
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.status}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Due Date
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.dueDate || "No due date"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Created By
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.createdByName || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Assigned To
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-1">
                                            {selectedBug.assignedUserName || "-"}
                                        </p>
                                    </div>

                                </div>


                                {/* Dates */}
                                <div className="border-t border-slate-100 pt-5 grid grid-cols-2 gap-5">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Created
                                        </p>

                                        <p className="text-sm text-slate-600 mt-1">
                                            {selectedBug.createdAt
                                                ? new Date(selectedBug.createdAt).toLocaleString()
                                                : "-"
                                            }
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Last Updated
                                        </p>

                                        <p className="text-sm text-slate-600 mt-1">
                                            {selectedBug.updatedAt
                                                ? new Date(selectedBug.updatedAt).toLocaleString()
                                                : "-"
                                            }
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-slate-200 flex justify-end">

                                <button
                                    onClick={() => setSelectedBug(null)}
                                    className="px-5 py-2.5 bg-slate-900
                                    hover:bg-slate-800 text-white rounded-lg
                                    text-sm font-medium transition"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default AssignedBugs;