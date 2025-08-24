"use client";

import React from "react";
import { useState } from "react";
import { GrClear } from "react-icons/gr";

const HistoryBar = ({ historyItems, onHistorySelect, onClearHistory }) => {
  return (
    <div className="w-36 md:w-64 lg:w-72 min-h-screen border-r overflow-auto inline-block">
      <div className="flex justify-evenly text-center flex-row">
        <h2 className=" font-bold text-2xl my-3 text-center flex-1">History</h2>
        <GrClear
          size={30}
          title="Clear History"
          className="text-red-600 mt-3 rounded mr-3"
          onClick={() => {
            onClearHistory();
          }}
        />
      </div>
      <ul className="space-y-2">
        {historyItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-2xl text-center"
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
