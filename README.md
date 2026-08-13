# StudyFlow AI

StudyFlow AI is a small AI-enhanced study planning application that helps students create realistic study plans based on their learning goal, deadline, and available study time. I chose this idea because students often struggle to turn a deadline and a large subject into a practical daily plan. The application uses Google's Gemini API to generate a personalized plan while validating user input and safely handling invalid or failed AI responses.

## Live Application

https://frontend-ai-capstone-mq9d.vercel.app/

## Repository

https://github.com/wajeeharashid3/frontend-ai-capstone

## Features

- AI-generated study plans
- Goal, deadline, and daily study-hour inputs
- Study-hour validation between 1 and 12 hours
- Deadline-aware AI planning
- Structured AI responses
- AI response validation before displaying results
- Loading and error states
- Accessible loading announcements
- Responsive Next.js frontend
- Accessible interactive components
- Automated tests for study-planner validation
- Production deployment on Vercel

## Tech Stack

- Next.js
- React
- JavaScript
- Google Gemini API
- `@google/genai`
- Node.js test runner
- Vercel
- Git and GitHub

## Getting Started

### Prerequisites

- Node.js installed
- Git installed
- A Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/wajeeharashid3/frontend-ai-capstone.git

cd frontend-ai-capstone