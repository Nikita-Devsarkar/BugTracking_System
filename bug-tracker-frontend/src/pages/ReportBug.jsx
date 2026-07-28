import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportBug() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");

    async function handleSubmit() {

    try {

        const response = await axios.post(
            "http://localhost:8080/bug",
            {
                title,
                description,
                priority,
                createdById: localStorage.getItem("userId")
            }
        );

        alert("Bug Reported Successfully!");

        console.log(response.data);

        navigate("/tester");

    } catch (error) {

        alert("Failed to Report Bug");

        console.log(error);

    }
}

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-3xl font-bold mb-6">
                Report Bug
            </h1>

            <input
                type="text"
                placeholder="Bug Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-80 mb-4"
            />

            <textarea
                placeholder="Bug Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-80 mb-4"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-2 w-80 mb-4"
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white p-2 rounded w-80"
            >
                Submit Bug
            </button>

        </div>
    );
}

export default ReportBug;