function Login() {
    return (
       <div className="min-h-screen flex  flex-col items-center justify-center bg-gray-100 ">
            <h1 className="text-4xl font-bold mb-6">Bug Tracker</h1>

            <input 
            type = "email" 
            placeholder="Email"
            className = "border border-gray-400 p-2 w-72 mb-4"/>

            <input 
            type = "password" 
            placeholder="Password"
            className = "border border-gray-400 p-2 w-72 mb-4"
            />

            <button className="bg-blue-600 text-white p-2 rounded w-72 hover:bg-blue-700">Login</button>
        </div>
    )
}

export default Login