import { useEffect, useState } from "react";

const statusFlow = ["Todo", "In Progress", "Done"];
const priorityFlow = ["Very High", "High", "Medium", "Low", "Very Low"];

// 🔥 Priority order (lower = higher priority)
const priorityRank = {
  "Very High": 1,
  High: 2,
  Medium: 3,
  Low: 4,
  "Very Low": 5,
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("list");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      headers: { Authorization: token },
    });

    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= UPDATE TASK =================
  const updateTask = async (id, updates) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updates),
    });

    fetchTasks();
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchTasks();
  };

  // ================= HELPERS =================
  const nextValue = (current, flow) =>
    flow[(flow.indexOf(current) + 1) % flow.length];

  const statusColor = (status) =>
    status === "Done"
      ? "bg-emerald-500"
      : status === "In Progress"
      ? "bg-yellow-400"
      : "bg-rose-500";

  const priorityColor = (priority) =>
    priority === "Very High"
      ? "bg-red-700"
      : priority === "High"
      ? "bg-orange-500"
      : priority === "Medium"
      ? "bg-yellow-400"
      : priority === "Low"
      ? "bg-green-500"
      : "bg-blue-500";

  const isOverdue = (task) =>
    task.status !== "Done" &&
    task.endDate &&
    new Date(task.endDate) < new Date();

  // ================= FILTER =================
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "All" && task.status !== statusFilter) return false;
    if (priorityFilter !== "All" && task.priority !== priorityFilter)
      return false;
    return true;
  });

  // ================= SORT (🔥 MAIN LOGIC) =================
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aOverdue = isOverdue(a);
    const bOverdue = isOverdue(b);

    // 1️⃣ Overdue first
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // 2️⃣ Priority order
    return priorityRank[a.priority] - priorityRank[b.priority];
  });

  // ================= TASK CARD =================
  const TaskCard = ({ task }) => (
    <div
      className={`relative p-5 rounded-2xl backdrop-blur-xl bg-white/80 shadow-xl border transition hover:-translate-y-1 ${
        isOverdue(task) ? "border-red-500 animate-pulse" : "border-white/50"
      }`}
    >
      <span
        className={`absolute top-3 right-3 ${priorityColor(
          task.priority
        )} text-white text-xs px-3 py-1 rounded-full`}
      >
        {task.priority}
      </span>

      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {task.title}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        Assigned to <b>{task.assignedTo}</b>
      </p>

      <p className="text-xs text-gray-400 mb-3">
        {task.startDate &&
          new Date(task.startDate).toLocaleDateString()}{" "}
        →{" "}
        {task.endDate &&
          new Date(task.endDate).toLocaleDateString()}
      </p>

      {isOverdue(task) && (
        <p className="text-xs text-red-600 font-semibold mb-2">
          ⚠ Overdue
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() =>
            updateTask(task._id, {
              status: nextValue(task.status, statusFlow),
            })
          }
          className={`${statusColor(
            task.status
          )} text-white px-3 py-1 rounded-full text-sm`}
        >
          {task.status}
        </button>

        <button
          onClick={() =>
            updateTask(task._id, {
              priority: nextValue(task.priority, priorityFlow),
            })
          }
          className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm"
        >
          Change Priority
        </button>
      </div>

      <button
        onClick={() => deleteTask(task._id)}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  );

  // ================= RENDER =================
  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          🚀 Team Progress Dashboard
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-lg"
          >
            <option>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 rounded-lg"
          >
            <option>All</option>
            {priorityFlow.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <button
            onClick={() =>
              setView(view === "list" ? "kanban" : "list")
            }
            className="bg-black/30 text-white px-4 py-2 rounded-lg"
          >
            {view === "list" ? "Kanban View" : "List View"}
          </button>
        </div>

        {/* Tasks */}
        {view === "list" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusFlow.map((status) => (
              <div key={status} className="space-y-4">
                <h2 className="text-xl font-bold text-white text-center">
                  {status}
                </h2>

                {sortedTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
