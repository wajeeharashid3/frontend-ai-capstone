
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">StudyFlow AI</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Good morning, Wajeeha 👋
          </h1>
          <p className="mt-2 text-slate-600">
            Here’s your study overview for today.
          </p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Tasks today</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">4</p>
            <p className="mt-1 text-sm text-slate-500">2 completed</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Study time</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">2h</p>
            <p className="mt-1 text-sm text-slate-500">of 3h planned</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Notes</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
            <p className="mt-1 text-sm text-slate-500">3 updated this week</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Weekly progress</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">68%</p>
            <p className="mt-1 text-sm text-slate-500">Keep going!</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Today’s priorities
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-slate-700">
                  Review frontend AI notes
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-slate-700">
                  Complete capstone task
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-slate-700">
                  Prepare study presentation
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              AI study assistant
            </h2>

            <p className="mt-3 text-slate-600">
              Your AI assistant will help organize tasks, suggest study plans,
              summarize notes, and keep your learning workflow on track.
            </p>

            <button
              type="button"
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Ask AI Assistant
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

