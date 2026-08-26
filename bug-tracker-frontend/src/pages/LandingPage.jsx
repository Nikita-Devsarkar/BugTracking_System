import { useNavigate } from "react-router-dom";
import {
    Bug,
    ShieldCheck,
    Users,
    BarChart3,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
            </div>

            <nav className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                        <Bug size={22} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold">
                            BugTracker
                        </h1>

                        <p className="text-xs text-slate-400">
                            Software Issue Management
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/login")}
                    className="border border-slate-600 hover:border-blue-400
                    px-5 py-2.5 rounded-lg text-sm font-medium
                    transition"
                >
                    Login
                </button>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-16 lg:pt-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2
                            px-3 py-1.5 rounded-full
                            bg-blue-500/10 border border-blue-500/20
                            text-blue-300 text-sm mb-6"
                        >
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                            Smart Bug Management
                        </div>


                        <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Track Bugs.
                            <span className="block text-blue-400">
                                Fix Faster.
                            </span>
                            Build Better.
                        </h2>


                        <p className="mt-6 text-lg text-slate-400 max-w-xl leading-8">
                            A centralized bug tracking platform that helps
                            teams report issues, assign developers, monitor
                            progress and deliver reliable software.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                onClick={() => navigate("/login")}
                                className="flex items-center gap-2
                                bg-blue-600 hover:bg-blue-500
                                px-6 py-3.5 rounded-xl
                                font-semibold transition
                                shadow-lg shadow-blue-600/20"
                            >
                                Get Started
                                <ArrowRight size={19} />
                            </button>

                            <button
                                onClick={() => {
                                    document
                                        .getElementById("features")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        });
                                }}
                                className="px-6 py-3.5 rounded-xl
                                border border-slate-700
                                hover:bg-slate-800
                                font-medium transition"
                            >
                                Explore Features
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-5 mt-8">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                />
                                Role-based access
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                />
                                Real-time tracking
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-5
                            bg-blue-600/20 blur-3xl rounded-full"
                        />
                        <div className="relative
                            bg-slate-900/90
                            border border-slate-700
                            rounded-2xl
                            shadow-2xl
                            overflow-hidden"
                        >

                            <div className="flex items-center gap-2
                                px-5 py-4
                                border-b border-slate-800"
                            >
                                <span className="w-3 h-3 bg-red-400 rounded-full" />
                                <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                                <span className="w-3 h-3 bg-green-400 rounded-full" />

                                <span className="ml-4 text-xs text-slate-500">
                                    BugTracker Dashboard
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Overview
                                        </p>

                                        <h3 className="text-xl font-semibold mt-1">
                                            Project Issues
                                        </h3>
                                    </div>

                                    <div className="bg-blue-500/10
                                        text-blue-400
                                        px-3 py-1 rounded-lg
                                        text-xs"
                                    >
                                        Active
                                    </div>
                                </div>


                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <div className="bg-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Total
                                        </p>
                                        <p className="text-2xl font-bold mt-2">
                                            24
                                        </p>
                                    </div>

                                    <div className="bg-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Progress
                                        </p>
                                        <p className="text-2xl font-bold mt-2 text-blue-400">
                                            12
                                        </p>
                                    </div>

                                    <div className="bg-slate-800 rounded-xl p-4">
                                        <p className="text-xs text-slate-500">
                                            Resolved
                                        </p>
                                        <p className="text-2xl font-bold mt-2 text-emerald-400">
                                            18
                                        </p>
                                    </div>

                                </div>

                                <div className="space-y-3">
                                    <div className="bg-slate-800
                                        rounded-xl p-4
                                        flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg
                                                bg-red-500/10
                                                text-red-400
                                                flex items-center justify-center"
                                            >
                                                <Bug size={18} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium">
                                                    Login authentication issue
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    BUG-1024
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-xs
                                            bg-orange-500/10
                                            text-orange-400
                                            px-3 py-1 rounded-full"
                                        >
                                            HIGH
                                        </span>
                                    </div>

                                    <div className="bg-slate-800
                                        rounded-xl p-4
                                        flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg
                                                bg-blue-500/10
                                                text-blue-400
                                                flex items-center justify-center"
                                            >
                                                <Bug size={18} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium">
                                                    Dashboard UI issue
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    BUG-1025
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-xs
                                            bg-blue-500/10
                                            text-blue-400
                                            px-3 py-1 rounded-full"
                                        >
                                            IN PROGRESS
                                        </span>

                                    </div>


                                    <div className="bg-slate-800
                                        rounded-xl p-4
                                        flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg
                                                bg-emerald-500/10
                                                text-emerald-400
                                                flex items-center justify-center"
                                            >
                                                <CheckCircle2 size={18} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium">
                                                    Profile update issue
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    BUG-1026
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-xs
                                            bg-emerald-500/10
                                            text-emerald-400
                                            px-3 py-1 rounded-full"
                                        >
                                            RESOLVED
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section
                    id="features"
                    className="pt-40 pb-24"
                >

                    <div className="text-center mb-12">
                        <p className="text-blue-400 text-sm font-semibold">
                            POWERFUL FEATURES
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            Everything your team needs
                        </h2>
                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <Feature
                            icon={<Bug size={22} />}
                            title="Bug Reporting"
                            text="Report and manage software issues from one place."
                        />

                        <Feature
                            icon={<Users size={22} />}
                            title="Developer Assignment"
                            text="Assign bugs to the right developer quickly."
                        />

                        <Feature
                            icon={<BarChart3 size={22} />}
                            title="Progress Tracking"
                            text="Monitor bugs through Open, In Progress and Resolved."
                        />

                        <Feature
                            icon={<ShieldCheck size={22} />}
                            title="Role Based Access"
                            text="Separate access for Admin, Developer and Tester."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}


function Feature({ icon, title, text }) {
    return (
        <div className="bg-slate-900/70
            border border-slate-800
            rounded-xl p-6
            hover:border-blue-500/40
            hover:-translate-y-1
            transition"
        >

            <div className="w-11 h-11
                bg-blue-500/10
                text-blue-400
                rounded-lg
                flex items-center justify-center mb-4"
            >
                {icon}
            </div>

            <h3 className="font-semibold text-lg">
                {title}
            </h3>

            <p className="text-sm text-slate-400 mt-2 leading-6">
                {text}
            </p>

        </div>
    );
}

export default LandingPage;