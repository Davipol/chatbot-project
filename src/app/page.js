"use client";

import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
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

      <div className="flex justify-center flex-col my-30 mx-5 lg:mx-40">
        <div className="bg-white flex-col w-full ">
          <form className="mx-auto  w-1/2 " id="word" onSubmit={handleSubmit}>
            <input
              className="w-full h-10 border-1 rounded"
              id="word"
              placeholder="Insert a word or a sentence..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="w-full mt-1 mx-auto  bg-blue-600 text-white text-xl px-4 py-2 rounded"
              type="submit"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>
          {answer && (
            <div className="h-fit space-y-3">
              <h2 className="font-bold text-lg text-center">
                Here is your answer:
              </h2>
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
