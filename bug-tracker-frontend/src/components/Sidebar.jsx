import {
    LayoutDashboard,
    Bug,
    LogOut
} from "lucide-react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        navigate("/");
    };

    const isDashboard = location.pathname === "/developer";
    const isAssignedBugs = location.pathname === "/developer/bugs";

    return (
        <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

            {/* Logo */}
            <div className="p-6 border-b border-slate-800">

                <h1 className="text-2xl font-bold">
                    🐞 BugTracker
                </h1>

                <p className="text-blue-200 text-sm mt-2">
                    Developer Panel
                </p>

            </div>


            {/* Navigation */}
            <div className="flex-1 mt-6">

                {/* Dashboard */}
                <button
                    onClick={() => navigate("/developer")}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition
                        ${
                            isDashboard
                                ? "bg-slate-800 text-white border-r-4 border-blue-500"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }
                    `}
                >
                    <LayoutDashboard size={20} />

                    <span>
                        Dashboard
                    </span>
                </button>


                {/* Assigned Bugs */}
                <button
                    onClick={() => navigate("/developer/bugs")}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition
                        ${
                            isAssignedBugs
                                ? "bg-slate-800 text-white border-r-4 border-blue-500"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }
                    `}
                >
                    <Bug size={20} />

                    <span>
                        Assigned Bugs
                    </span>
                </button>

            </div>


            {/* Logout */}
            <div className="p-6">

                <button
                    onClick={logout}
                    className="w-full text-slate-300 hover:text-white
                    hover:bg-red-500/10 rounded-lg py-3 flex items-center
                    justify-center gap-2 transition"
                >
                    <LogOut size={18} />

                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;