"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import HistoryBar from "./components/HistoryBar";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const cleanedHistory = savedHistory.filter(
      (item) => item.question && item.question.trim().length > 0
    );
    setHistory(cleanedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(cleanedHistory));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    const currentQuestion = question;
    setSubmittedQuestion(currentQuestion);
    setQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuestion }),
      });
      const data = await response.json();
      setAnswer(data);

      const newHistoryEntry = { question: currentQuestion, answer: data };
      const updatedHistory = [newHistoryEntry, ...history];
      if (currentQuestion.trim().length > 0) {
        setHistory(updatedHistory);
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      }
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

  const displayedItem = selectedHistoryItem || {
    question: submittedQuestion,
    answer,
  };

  const clearHistory = () => {
    setHistory([]);
    setSelectedHistoryItem("");
    localStorage.removeItem("chatHistory");
  };

  return (
    <>
      <Header />
      <button
        className="sm:hidden fixed top-2 left-2 z-30 px-3 py-2 bg-gray-800 text-white rounded"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Close History" : "Open History"}
      </button>
      <div className="flex">
        <div
          className={`
            ${showHistory ? "block" : "hidden"}
            fixed top-0 left-0 h-full z-20 bg-white
            sm:block sm:static sm:h-auto
          `}
        >
          <HistoryBar
            historyItems={history}
            onHistorySelect={setSelectedHistoryItem}
            onClearHistory={clearHistory}
          />
        </div>
        <div className=" flex-1 justify-center flex-col my-12 mx-2 sm:mx-5 md:mx-5 lg:mx-20">
          <div className="bg-white flex-col w-full  ">
            <form
              className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full px-3 py-2 border rounded text-base md:text-lg lg:text-xl"
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
                    {displayedItem.answer.modernMeaning || "N/A"}
                  </p>
                  <p>
                    <strong>Century of origin:</strong>{" "}
                    {displayedItem.answer.centuryOfOrigin || "N/A"}
                  </p>
                  <p>
                    <strong>Etymology:</strong>{" "}
                    {displayedItem.answer.detailedEtymology || "N/A"}
                  </p>
                  <p>
                    <strong>Fun fact:</strong>{" "}
                    {displayedItem.answer.funFact || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
