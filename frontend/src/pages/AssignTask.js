import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AssignTask() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const assignTask = async () => {
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!title || !assignedTo) {
      setError("Title and Assigned To are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          assignedTo,
          status,
          priority,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) {
        throw new Error("Task creation failed");
      }

      // Clear form after success
      setTitle("");
      setAssignedTo("");
      setStatus("Todo");
      setPriority("Medium");
      setStartDate("");
      setEndDate("");

      alert("Task assigned successfully");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6">Assign Task</h2>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Task Title */}
          <input
            className="w-full mb-3 p-3 border rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Assigned To */}
          <input
            className="w-full mb-3 p-3 border rounded"
            placeholder="Assigned to"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          {/* Status */}
          <select
            className="w-full mb-3 p-3 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          {/* Priority */}
          <select
            className="w-full mb-4 p-3 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Very High</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Very Low</option>
          </select>

          {/* Dates (LEFT / RIGHT) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={assignTask}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}
