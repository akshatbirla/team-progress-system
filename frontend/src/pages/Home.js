export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 px-12 py-16">
      
      {/* HERO */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Manage Your Team <br /> Smarter, Faster 🚀
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Assign tasks, track progress, manage deadlines and priorities —
            all powered by <span className="font-semibold text-green-300">MongoDB</span> 💚
          </p>

          <div className="flex gap-4">
            <a
              href="/dashboard"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Go to Dashboard
            </a>

            <a
              href="/assign"
              className="bg-black/30 text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-black/40 transition"
            >
              Assign a Task
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative">
          <img
            src="https://illustrations.popsy.co/white/team-work.svg"
            alt="Team collaboration"
            className="w-full drop-shadow-2xl"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Why Team Progress?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "📋 Task Assignment",
            "📊 Kanban Dashboard",
            "⏰ Deadline Tracking",
            "🔥 Priority Management",
          ].map((item) => (
            <div
              key={item}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center font-semibold shadow-xl hover:-translate-y-2 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* MONGODB STRIP */}
      <div className="max-w-7xl mx-auto mt-24 bg-black/30 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white text-xl font-semibold">
          Built with ❤️ using MongoDB Atlas
        </p>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"
          alt="MongoDB"
          className="h-12 bg-white p-2 rounded-lg"
        />
      </div>
    </div>
  );
}
