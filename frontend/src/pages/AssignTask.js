import { useState } from "react";

export default function AssignTask() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const assignTask = async () => {
    setError("");

    if (!title || !assignedTo || !startDate || !endDate) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
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
          description,
        }),
      });

      if (!res.ok) throw new Error();

      setTitle("");
      setAssignedTo("");
      setStatus("Todo");
      setPriority("Medium");
      setStartDate("");
      setEndDate("");
      setDescription("");

      alert("Task assigned successfully 🚀");
    } catch {
      setError("Failed to assign task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            ✨ Assign New Task
          </h2>
          <p className="text-indigo-100 mt-1">
            Create and assign tasks effortlessly
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="mb-4 text-center text-red-600 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Task Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Assigned To *"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                className="p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <select
                className="p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Very High</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
                <option>Very Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <textarea
              rows={4}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Task Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={assignTask}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white py-4 rounded-xl text-lg font-bold shadow-lg transition"
            >
              Assign Task 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
