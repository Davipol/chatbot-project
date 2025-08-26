"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HistoryBar from "./components/HistoryBar";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import Footer from "./components/Footer";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [typedLines, setTypedLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");
  const typingTimeoutRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const cleanedHistory = savedHistory.filter(
      (item) => item.question && item.question.trim().length > 0
    );
    setHistory(cleanedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(cleanedHistory));
  }, []);

  const clearTypingTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (error) {
      clearTypingTimeout();
      setTypedLines([]);
      return;
    }

    const currentAnswer = selectedHistoryItem?.answer || answer;
    if (!currentAnswer) {
      clearTypingTimeout();
      setTypedLines([]);
      return;
    }

    const safe = (v) =>
      typeof v === "string" ? v : v == null ? "N/A" : String(v);

    const fields = [
      safe(currentAnswer.modernMeaning).trim() || "N/A",
      safe(currentAnswer.centuryOfOrigin).trim() || "N/A",
      safe(currentAnswer.detailedEtymology).trim() || "N/A",
      safe(currentAnswer.funFact).trim() || "N/A",
    ];

    clearTypingTimeout();
    setTypedLines(Array(fields.length).fill(""));

    const typeField = (fieldIndex, charIndex) => {
      if (fieldIndex >= fields.length) return;

      const text = fields[fieldIndex];

      setTypedLines((prev) => {
        const next = [...prev];
        next[fieldIndex] = text.slice(0, charIndex + 1);
        return next;
      });

      if (charIndex + 1 < text.length) {
        typingTimeoutRef.current = setTimeout(
          () => typeField(fieldIndex, charIndex + 1),
          25
        );
      } else {
        typingTimeoutRef.current = setTimeout(
          () => typeField(fieldIndex + 1, 0),
          150
        );
      }
    };

    typeField(0, 0);

    return () => clearTypingTimeout();
  }, [answer, selectedHistoryItem, error]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    setError("");
    setSelectedHistoryItem(null);
    const currentQuestion = question;
    setSubmittedQuestion(currentQuestion);
    setQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuestion }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const safeData = {
        modernMeaning: data.modernMeaning || "N/A",
        centuryOfOrigin: data.centuryOfOrigin || "N/A",
        detailedEtymology: data.detailedEtymology || "N/A",
        funFact: data.funFact || "N/A",
      };

      setAnswer(safeData);

      const newHistoryEntry = { question: currentQuestion, answer: safeData };

      const filteredHistory = history.filter(
        (item) => item.question.toLowerCase() !== currentQuestion.toLowerCase()
      );

      const updatedHistory = [newHistoryEntry, ...filteredHistory];

      setHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      setError("Error fetching answer. Please try again.");
      setAnswer(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showHistory &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHistory]);
  const wordToUpperCase = (word) => {
    if (!word) return "";
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const displayedItem =
    selectedHistoryItem ||
    (answer ? { question: submittedQuestion, answer } : null);

  const clearHistory = () => {
    setHistory([]);
    setSelectedHistoryItem(null);
    localStorage.removeItem("chatHistory");
  };

  return (
    <>
      <Header />
      {showHistory ? (
        <LuPanelRightOpen
          size={30}
          className="sm:hidden fixed top-4 left-38 z-30 bg-blue-400 text-white rounded transform transition-discrete"
          onClick={() => setShowHistory(false)}
          title="Close History"
        />
      ) : (
        <LuPanelLeftOpen
          size={30}
          className="sm:hidden fixed top-4 left-3 z-30 bg-blue-400 text-white rounded"
          onClick={() => setShowHistory(true)}
          title="Open History"
        />
      )}
      {showHistory && (
        <div
          className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          onClick={() => setShowHistory(false)}
        />
      )}

      <div className="flex">
        <div
          ref={sidebarRef}
          className={`
            fixed top-0 left-0 h-full z-20 bg-white shadow-lg transform transition-transform duration-300
            ${showHistory ? "translate-x-0" : "-translate-x-full"}
            sm:static sm:translate-x-0 sm:h-auto sm:w-56sm:shadow-none
          `}
        >
          <HistoryBar
            historyItems={history}
            onHistorySelect={setSelectedHistoryItem}
            onClearHistory={clearHistory}
          />
        </div>

        <div className="flex flex-1 flex-col my-12 mx-2 sm:mx-5 md:mx-5 lg:mx-20">
          <form
            className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full px-3 py-2 border rounded text-base md:text-lg lg:text-xl"
              id="word"
              placeholder="Insert a word or a sentence..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="w-full mx-auto bg-blue-600 text-white text-xl px-4 py-2 rounded mt-2"
              type="submit"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          <div className="mt-4 w-full">
            {error ? (
              <p className="text-red-600 font-semibold text-center">{error}</p>
            ) : (
              displayedItem &&
              displayedItem.answer && (
                <div className="bg-white flex-col w-full">
                  <h2 className="font-bold text-lg text-center mt-2">
                    Here is your answer:
                  </h2>
                  <p className="font-bold text-2xl text-center mt-1">
                    <strong>{wordToUpperCase(displayedItem.question)}</strong>
                  </p>
                  <div className="bg-blue-100 h-fit rounded-2xl p-2 space-y-3 mt-2">
                    {typedLines.map((line, index) => {
                      const fieldNames = [
                        "Modern meaning",
                        "Century of origin",
                        "Etymology",
                        "Fun fact",
                      ];
                      return (
                        <p key={index}>
                          <strong>{fieldNames[index]}:</strong> {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
