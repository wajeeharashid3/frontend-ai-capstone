"use client";

import { useState } from "react";

export default function StudyPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState("");
const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setPlan("");
    setError("");

    try {
      const response = await fetch("/api/study-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          deadline,
          hours,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setPlan(data.plan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>AI Study Planner</h1>

      <p>
        Create a personalized study plan based on your goals, deadline, and
        available study time.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="goal">What do you need to study?</label>

          <textarea
            id="goal"
            name="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="Example: I have a Biology exam and need to revise chapters 1–5."
            required
          />
        </div>

        <div>
          <label htmlFor="deadline">Deadline</label>

          <input
            id="deadline"
            name="deadline"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hours">Available study hours per day</label>

          <input
            id="hours"
            name="hours"
            type="number"
            min="1"
            max="12"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            placeholder="Example: 2"
            required
          />
        </div>

        <button
  type="submit"
  disabled={loading}
role="status"
aria-live="polite">
  {loading ? "Generating your study plan..." : "Generate Study Plan"}
</button>
{loading && (
  <p role="status" aria-live="polite">
    StudyFlow AI is creating your personalized study plan. Please wait.
  </p>
)}
      </form>

      {error && (
        <section role="alert">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </section>
      )}

     {plan && (
  <section aria-live="polite">
    <h2>Your AI Study Plan</h2>

    <p>
      <strong>Priority:</strong> {plan.priority}
    </p>

    <h3>Study Tasks</h3>

    <ul>
      {plan.tasks.map((task, index) => (
        <li key={`${task.day}-${index}`}>
          <strong>{task.day}:</strong> {task.task} — {task.duration} minutes
        </li>
      ))}
    </ul>

    <h3>Recommended Order</h3>

    <ol>
      {plan.recommendedOrder.map((topic, index) => (
        <li key={`${topic}-${index}`}>{topic}</li>
      ))}
    </ol>

    <h3>Study Tip</h3>

    <p>{plan.tip}</p>
  </section>
)}
    </main>
  );
}