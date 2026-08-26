import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Bug,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    X,
    Mail,
    Lock
} from "lucide-react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const navigate = useNavigate();

    async function handleLogin() {

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                {
                    email: email.trim(),
                    password: password.trim()
                }
            );
            if (response.data.message === "Login Successful") {

                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userName", response.data.name);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("token", response.data.token);

                console.log(
                    "TOKEN SAVED:",
                    localStorage.getItem("token")
                );

                setEmail("");
                setPassword("");
                setLoading(false);

                if (response.data.role === "ADMIN") {
                    navigate("/admin");
                } else if (response.data.role === "DEVELOPER") {
                    navigate("/developer");
                } else if (response.data.role === "TESTER") {
                    navigate("/tester");
                }
            }

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            setLoading(false);
            setError("Invalid Email or Password");
        }
    }

    return (

        <div className="min-h-screen relative overflow-hidden bg-slate-950">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80')"
                    }}
                />

                <div className="absolute inset-0 bg-slate-950/85" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">                      
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                                    <Bug size={27} />
                                </div>
                              <div>
                                    <h1 className="text-2xl font-bold">
                                        BugTracker
                                    </h1>

                                    <p className="text-xs text-slate-400">
                                        Issue Management System
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Track.
                                <span className="text-blue-500">
                                    {" "}Manage.
                                </span>
                                <br />
                                Resolve.
                            </h2>

                            <p className="mt-6 text-lg text-slate-300 max-w-xl leading-8">
                                A centralized platform to report bugs,
                                assign developers, monitor progress and
                                keep your software development workflow
                                organized.
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 mt-10">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <Bug
                                        size={22}
                                        className="text-blue-400 mb-3"
                                    />

                                    <p className="font-semibold">
                                        Bug Tracking
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        Report and monitor issues
                                    </p>
                                </div>


                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <ShieldCheck
                                        size={22}
                                        className="text-emerald-400 mb-3"
                                    />

                                    <p className="font-semibold">
                                        Role Based
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        Admin, Developer & Tester
                                    </p>
                                </div>


                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <BarChart3
                                        size={22}
                                        className="text-purple-400 mb-3"
                                    />

                                    <p className="font-semibold">
                                        Track Progress
                                    </p>

                                    <p className="text-xs text-slate-400 mt-1">
                                        Monitor bug status
                                    </p>
                                </div>
                            </div>

                            {!showLogin && (
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="mt-10 group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition"
                                >
                                    Get Started
                                    <ArrowRight
                                        size={20}
                                        className="group-hover:translate-x-1 transition"
                                    />
                                </button>
                            )}
                        </div>

                        {showLogin && (
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative animate-[fadeIn_.3s_ease-in-out]">
                                    <button
                                        onClick={() => {
                                            setShowLogin(false);
                                            setError("");
                                        }}
                                        className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
                                    >
                                        <X size={21} />
                                    </button>

                                    <div className="mb-8">
                                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                            <Bug size={23} />
                                        </div>

                                        <h2 className="text-2xl font-bold text-slate-800">
                                            Welcome Back
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Sign in to your BugTracker account
                                        </p>
                                    </div>

                                    <form
                                        autoComplete="off"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleLogin();
                                        }}
                                    >

                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Email Address
                                            </label>

                                            <div className="relative">
                                                <Mail
                                                    size={18}
                                                    className="absolute left-3 top-3.5 text-slate-400"
                                                />

                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Password
                                            </label>

                                            <div className="relative">
                                                <Lock
                                                    size={18}
                                                    className="absolute left-3 top-3.5 text-slate-400"
                                                />

                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    autoComplete="new-password"
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-3 rounded-xl font-semibold text-sm transition"
                                        >
                                            {loading
                                                ? "Signing in..."
                                                : "Sign In"
                                            }
                                        </button>
                                    </form>

                                    <p className="text-center text-xs text-slate-400 mt-6">
                                        Secure access to your BugTracker workspace
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;