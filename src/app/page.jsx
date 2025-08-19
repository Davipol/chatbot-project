"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [history, sethistory] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    setSubmittedQuestion(question);
    setQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: submittedQuestion }),
      });
      const data = await response.json();
      setAnswer(data);
    } catch (error) {
      setAnswer("Error: Could not get answer.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  const wordToUpperCase = (word) => {
    if (!word) {
      return "";
    }
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  };

  return (
    <>
      <Header />

      <div className="flex justify-center flex-col my-30 mx-5 lg:mx-40">
        <div className="bg-white flex-col w-full ">
          <form className="mx-auto  w-1/2 " onSubmit={handleSubmit}>
            <input
              className="w-full px-1 h-10 border-1 rounded"
              id="word"
              placeholder=" Insert a word or a sentence..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="w-full mx-auto  bg-blue-600 text-white text-xl px-4 py-2 rounded"
              type="submit"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer && (
            <div className="h-fit space-y-3">
              <h2 className="font-bold text-lg text-center mt-2">
                Here is your answer:
              </h2>
              <p className="font-bold text-2xl text-center">
                <strong>{wordToUpperCase(submittedQuestion)}</strong>
              </p>
              <div className="bg-blue-100 h-fit border-2 rounded-2xl p-2 space-y-3">
                <p>
                  <strong>Modern meaning:</strong>{" "}
                  {answer.modernMeaning || "N/A"}
                </p>
                <p>
                  <strong>Century of origin:</strong>{" "}
                  {answer.centuryOfOrigin || "N/A"}
                </p>
                <p>
                  <strong>Etymology:</strong>{" "}
                  {answer.detailedEtymology || "N/A"}
                </p>
                <p>
                  <strong>Fun fact:</strong> {answer.funFact || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
