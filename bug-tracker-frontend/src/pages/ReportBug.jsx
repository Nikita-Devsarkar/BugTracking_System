import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Bug,
    FileText,
    AlertCircle,
    Send,
    ArrowLeft
} from "lucide-react";

function ReportBug() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("OTHER");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter bug title");
            return;
        }

        if (!description.trim()) {
            alert("Please enter bug description");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const response = await axios.post(
                "http://localhost:8080/bug",
                {
                    title: title.trim(),
                    description: description.trim(),
                    priority: priority,
                    category: category,
                    dueDate: null,
                    createdById: Number(userId)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            

            console.log("BUG CREATED:", response.data);

            alert("Bug Reported Successfully!");

            setTitle("");
            setDescription("");
            setPriority("LOW");
            setCategory("OTHER");
            navigate("/tester");

        } catch (error) {

            console.error("REPORT BUG ERROR:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);

            if (error.response?.status === 403) {
                alert("You are not authorized to report a bug.");
            } else {
                alert("Failed to Report Bug");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Bug
                            size={19}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-800">
                            BugTracker
                        </h1>

                        <p className="text-xs text-slate-400">
                            Bug Reporting System
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/tester")}
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-lg
                        border border-slate-200
                        bg-white
                        text-sm font-medium
                        text-slate-600
                        hover:bg-slate-50
                        transition
                    "
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>
            </header>

            <main className="px-4 py-8">
                <div className="text-center mb-7">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-3">
                        <Bug
                            size={24}
                            className="text-blue-600"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        Report a Bug
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Help the development team understand and resolve the issue.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <FileText
                                        size={19}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        Bug Details
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-0.5">
                                        Provide accurate information about the issue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="px-6 py-6 space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Bug size={16} />
                                        Bug Title
                                    </label>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Example: Login button is not working"
                                        className="
                                            w-full
                                            border border-slate-200
                                            rounded-lg
                                            px-4 py-3
                                            text-sm
                                            text-slate-700
                                            placeholder:text-slate-400
                                            outline-none
                                            focus:border-blue-400
                                            focus:ring-2
                                            focus:ring-blue-100
                                            transition
                                        "
                                    />

                                    <p className="text-xs text-slate-400 mt-2">
                                        Keep the title short and descriptive.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                            <FileText size={16} />
                                            Description
                                        </label>

                                        <span className="text-xs text-slate-400">
                                            {description.length}/1000
                                        </span>
                                    </div>

                                    <textarea
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        maxLength={1000}
                                        rows={6}
                                        placeholder="Describe the issue, steps to reproduce it, and what you expected to happen..."
                                        className="
                                            w-full
                                            border border-slate-200
                                            rounded-lg
                                            px-4 py-3
                                            text-sm
                                            text-slate-700
                                            placeholder:text-slate-400
                                            resize-none
                                            outline-none
                                            focus:border-blue-400
                                            focus:ring-2
                                            focus:ring-blue-100
                                            transition
                                        "
                                    />
                                </div>
                        
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <AlertCircle size={16} />
                                        Priority
                                    </label>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setPriority("LOW")}
                                            className={`
                                                text-left
                                                px-4 py-3
                                                rounded-lg
                                                border
                                                transition
                                                ${
                                                    priority === "LOW"
                                                        ? "border-emerald-400 bg-emerald-50"
                                                        : "border-slate-200 hover:bg-slate-50"
                                                }
                                            `}
                                        >
                                            <p className="text-sm font-semibold text-slate-700">
                                                Low
                                            </p>

                                            <p className="text-xs text-slate-400 mt-1">
                                                Minor issue
                                            </p>
                                        </button>
                                        
                                        <button
                                            type="button"
                                            onClick={() => setPriority("MEDIUM")}
                                            className={`
                                                text-left
                                                px-4 py-3
                                                rounded-lg
                                                border
                                                transition
                                                ${
                                                    priority === "MEDIUM"
                                                        ? "border-yellow-400 bg-yellow-50"
                                                        : "border-slate-200 hover:bg-slate-50"
                                                }
                                            `}
                                        >

                                            <p className="text-sm font-semibold text-slate-700">
                                                Medium
                                            </p>

                                            <p className="text-xs text-slate-400 mt-1">
                                                Needs attention
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPriority("HIGH")}
                                            className={`
                                                text-left
                                                px-4 py-3
                                                rounded-lg
                                                border
                                                transition
                                                ${
                                                    priority === "HIGH"
                                                        ? "border-orange-400 bg-orange-50"
                                                        : "border-slate-200 hover:bg-slate-50"
                                                }
                                            `}
                                        >
                                            <p className="text-sm font-semibold text-slate-700">
                                                High
                                            </p>

                                            <p className="text-xs text-slate-400 mt-1">
                                                Important issue
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Category
                                    </label>

                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="
                                            w-full
                                            border border-slate-200
                                            rounded-lg
                                            px-4 py-3
                                            text-sm
                                            text-slate-700
                                            bg-white
                                            outline-none
                                            focus:border-blue-400
                                            focus:ring-2
                                            focus:ring-blue-100
                                        "
                                    >
                                        <option value="UI">UI</option>
                                        <option value="FRONTEND">Frontend</option>
                                        <option value="BACKEND">Backend</option>
                                        <option value="DATABASE">Database</option>
                                        <option value="AUTHENTICATION">Authentication</option>
                                        <option value="SECURITY">Security</option>
                                        <option value="PERFORMANCE">Performance</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <p className="text-xs text-slate-400">
                                    Make sure the information is accurate.
                                </p>

                                <div className="flex items-center gap-3">

                                    <button
                                        type="button"
                                        onClick={() => navigate("/tester")}
                                        className="
                                            px-4 py-2.5
                                            rounded-lg
                                            border border-slate-200
                                            bg-white
                                            text-sm font-medium
                                            text-slate-600
                                            hover:bg-slate-50
                                            transition
                                        "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            flex items-center gap-2
                                            px-5 py-2.5
                                            rounded-lg
                                            bg-slate-900
                                            hover:bg-slate-800
                                            disabled:bg-slate-400
                                            text-white
                                            text-sm font-semibold
                                            transition
                                        "
                                    >
                                        <Send size={16} />

                                        {loading
                                            ? "Submitting..."
                                            : "Submit Bug"
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReportBug;