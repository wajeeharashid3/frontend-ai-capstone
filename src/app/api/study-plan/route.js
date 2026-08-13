import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const { goal, deadline, hours } = body;

    if (
      !goal ||
      !deadline ||
      hours === undefined ||
      hours === null ||
      hours === ""
    ) {
      return Response.json(
        {
          error:
            "Please provide a goal, deadline, and available study hours.",
        },
        { status: 400 }
      );
    }

    if (Number(hours) < 1 || Number(hours) > 12) {
      return Response.json(
        {
          error: "Study hours must be between 1 and 12.",
        },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const prompt = `
You are StudyFlow AI, a helpful study planning assistant.

Today's date is ${today}.

Student goal:
${goal}

Deadline:
${deadline}

Available study hours per day:
${hours}

Create a realistic study plan.

Return ONLY valid JSON in this exact structure:

{
  "priority": "High",
  "tasks": [
    {
      "day": "Day 1",
      "task": "Topic or activity",
      "duration": 60
    }
  ],
  "recommendedOrder": [
    "First topic",
    "Second topic"
  ],
  "tip": "One short practical study tip."
}

Rules:
- priority must be Low, Medium, or High.
- tasks must be an array.
- Every task must contain day, task, and duration.
- duration must be a number representing minutes.
- recommendedOrder must be an array of strings.
- tip must be a short string.
- Do not use Markdown.
- Do not use code fences.
- Do not put any text outside the JSON object.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text?.trim();

    if (!text) {
      return Response.json(
        {
          error: "The AI returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    let plan;

try {
  plan = JSON.parse(text);
} catch (parseError) {
  console.error("Invalid AI JSON:", parseError);

  return Response.json(
    {
      error: "The AI returned an invalid study plan. Please try again.",
    },
    { status: 502 }
  );
}

if (
  !plan ||
  typeof plan.priority !== "string" ||
  !Array.isArray(plan.tasks) ||
  !Array.isArray(plan.recommendedOrder) ||
  typeof plan.tip !== "string"
) {
  return Response.json(
    {
      error: "The AI returned an incomplete study plan. Please try again.",
    },
    { status: 502 }
  );
}

return Response.json({
  plan,
});
  } catch (error) {
    console.error("Study plan generation failed:", error);

    return Response.json(
      {
        error: "Unable to generate a study plan right now. Please try again.",
      },
      { status: 500 }
    );
  }
}