import {
    LayoutDashboard,
    Bug,
    Users,
    LogOut,
    FilePlus
} from "lucide-react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        localStorage.removeItem("token");

        navigate("/");
    };

    const adminMenu = [
        {
            label: "Dashboard",
            path: "/admin",
            icon: <LayoutDashboard size={20} />
        }
    ];

    const developerMenu = [
        {
            label: "Dashboard",
            path: "/developer",
            icon: <LayoutDashboard size={20} />
        },
        {
            label: "Assigned Bugs",
            path: "/developer/bugs",
            icon: <Bug size={20} />
        }
    ];

    const testerMenu = [
        {
            label: "Dashboard",
            path: "/tester",
            icon: <LayoutDashboard size={20} />
        },
        {
            label: "Report Bug",
            path: "/report-bug",
            icon: <FilePlus size={20} />
        }
    ];

    let menuItems = [];

    if (role === "ADMIN") {
        menuItems = adminMenu;
    } else if (role === "DEVELOPER") {
        menuItems = developerMenu;
    } else if (role === "TESTER") {
        menuItems = testerMenu;
    }

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                bottom-0
                w-64
                bg-slate-900
                text-white
                flex
                flex-col
                z-50
            "
        >

            {/* Logo */}

            <div className="p-6 border-b border-slate-800">

                <h1 className="text-2xl font-bold">
                    🐞 BugTracker
                </h1>

                <p className="text-blue-200 text-sm mt-2">
                    {role === "ADMIN"
                        ? "Admin Panel"
                        : role === "DEVELOPER"
                        ? "Developer Panel"
                        : role === "TESTER"
                        ? "Tester Panel"
                        : "User Panel"
                    }
                </p>

            </div>


            {/* Navigation */}

            <nav className="flex-1 mt-6 overflow-y-auto">

                {menuItems.map((item) => {

                    const isActive =
                        location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`
                                w-full
                                flex
                                items-center
                                gap-3
                                px-6
                                py-3
                                transition
                                ${
                                    isActive
                                        ? "bg-slate-800 text-white border-r-4 border-blue-500"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }
                            `}
                        >

                            {item.icon}

                            <span>
                                {item.label}
                            </span>

                        </button>
                    );

                })}

            </nav>


            {/* Logout */}

            <div className="p-6 border-t border-slate-800">

                <button
                    onClick={logout}
                    className="
                        w-full
                        text-slate-300
                        hover:text-white
                        hover:bg-red-500/10
                        rounded-lg
                        py-3
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                    "
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;