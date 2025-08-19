"use client";

import React from "react";
import { useState } from "react";

const HistoryBar = ({ historyItems }) => {
  const [historyItemClicked, setHistoryItemClicked] = useState("");
  const handleClick = (item) => {
    setHistoryItemClicked(item.answer);
  };

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 border-r">
      <h2 className="font-bold mb-2 text-center">History</h2>
      <ul className="space-y-2">
        {historyItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded text-center"
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryBar;
