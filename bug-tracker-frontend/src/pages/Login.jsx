import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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

                setEmail("");
                setPassword("");

                if (response.data.role === "ADMIN") {
                    navigate("/admin");
                } else if (response.data.role === "DEVELOPER") {
                    navigate("/developer");
                } else if (response.data.role === "TESTER") {
                    navigate("/tester");
                }
            }
            console.log(response.data);       
        } catch (error) {
            setLoading(false);
            setError("Invalid Email or Password");
        }
    }

    return (
       <form
            autoComplete="off"
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}
        >
            <h1 className="text-4xl font-bold mb-6">Bug Tracker</h1>

            <input 
            type = "email" 
            name="email"
            placeholder="Email"
            className = "border border-gray-400 p-2 w-72 mb-4"
            value = {email}
            autoComplete="off"
            onChange = {(e) => setEmail(e.target.value)}
            />

            <input 
            type = "password" 
            name="password"
            placeholder="Password"
            className = "border border-gray-400 p-2 w-72 mb-4"
            value = {password}
            autoComplete="new-password"
            onChange = {(e) => setPassword(e.target.value)}
            />

            {error && 
                <p className="text-red-600 mb-4">
                    {error}
                </p>}

            <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded w-72 hover:bg-blue-700">
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}

export default Login