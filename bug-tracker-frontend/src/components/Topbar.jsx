import { Bell, UserCircle } from "lucide-react";

function Topbar({ title = "Developer Dashboard", subtitle = "Manage your assigned bugs" }) {
    
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");

    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4
            flex justify-between items-center"
        >
            <div>
                <h2 className="text-xl font-semibold text-slate-800">
                    {title}
                </h2>

                <p className="text-sm text-slate-500">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-5">
                <button
                    className="relative p-2 rounded-lg text-slate-500
                    hover:bg-slate-100 hover:text-slate-800 transition"
                >
                    <Bell size={20} />

                    <span className="absolute top-1 right-1 w-2 h-2
                    bg-red-500 rounded-full">
                    </span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <UserCircle
                        size={34}
                        className="text-slate-500"
                    />

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {role}
                        </p>

                        <p className="text-xs text-slate-500">
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;