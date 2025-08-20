"use client";

import React from "react";
import { useState } from "react";

const HistoryBar = ({ historyItems, onHistorySelect, onClearHistory }) => {
  return (
    <div className="w-38 md:w-56 lg:w-72 min-h-screen border-r overflow-auto">
      <div className="flex justify-evenly text-center flex-row">
        <h2 className=" font-bold text-2xl my-3 text-center">History</h2>
        <button
          className="bg-blue-600 font-bold hover:bg-blue-400 text-white rounded"
          onClick={() => {
            onClearHistory();
          }}
        >
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        {historyItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded text-center"
            onClick={() => {
              onHistorySelect(item);
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
