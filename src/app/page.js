"use client";

import { useState } from "react";
import Header from "./components/Header";
export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await response.json();
      setAnswer(data);
    } catch (error) {
      setAnswer("Error: Could not get answer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center m-0 my-50 min-h-96">
        <div className="bg-white flex flex-col">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              type="submit"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer && (
            <div className="mt-4">
              <h2 className="font-bold text-lg">Here is your answer:</h2>
              <p>
                <strong>Modern meaning:</strong> {answer.modernMeaning || "N/A"}
              </p>
              <p>
                <strong>Century of origin:</strong>{" "}
                {answer.centuryOfOrigin || "N/A"}
              </p>
              <p>
                <strong>Etymology:</strong> {answer.detailedEtymology || "N/A"}
              </p>
              <p>
                <strong>Fun fact:</strong> {answer.funFact || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
