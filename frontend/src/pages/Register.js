import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-500">
      <div className="bg-white rounded-2xl shadow-2xl w-[380px] p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Start managing your team
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          placeholder="Full Name"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
