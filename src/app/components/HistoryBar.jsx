"use client";

import React from "react";
import { GrClear } from "react-icons/gr";

const HistoryBar = ({
  historyItems,
  onHistorySelect,
  onClearHistory,
  onDeleteItem,
}) => {
  return (
    <div className="w-60 sm:w-64 md:w-64 lg:w-72 min-h-screen border-r-2 overflow-auto inline-block">
      <div className="relative border-b-1 pb-1">
        <h2 className=" font-bold text-2xl my-3 text-center pr-10">History</h2>
        <GrClear
          size={30}
          title="Clear History"
          className="absolute right-3 top-1/3 -translate-y-1/2 text-red-600 cursor-pointer"
          onClick={() => {
            onClearHistory();
          }}
        />
      </div>
      <ul className="space-y-2">
        {historyItems.map((item, index) => (
          <li
            key={index}
            className="relative cursor-pointer hover:bg-gray-200 p-2 pr-10 rounded-2xl text-center text-xl truncate"
            onClick={() => {
              onHistorySelect(item);
            }}
          >
            {item.question}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item);
              }}
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryBar;
