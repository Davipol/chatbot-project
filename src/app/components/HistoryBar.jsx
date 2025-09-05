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
    <div className="w-60 sm:w-60 md:w-64 lg:w-72 min-h-screen border-r-3 border-t-3 border-stone-300 rounded-tr-lg overflow-hidden inline-block bg-stone-100 dark:bg-stone-900 text-black  dark:text-white">
      <div className="relative border-b-3 pb-1 flex justify-center items-center">
        <h2 className="font-bold text-2xl my-3 text-center pr-10">History</h2>

        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => onClearHistory()}
        >
          <GrClear
            size={25}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
            title="Clear History"
          />
          <span className="text-red-600 dark:text-red-400 text-xs font-semibold hover:text-red-700">
            Clear
          </span>
        </div>
      </div>
      <div className="max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-transparent dark:scrollbar-thumb-zinc-600">
        <ul className="space-y-2">
          {historyItems.map((item, index) => (
            <li
              key={index}
              className="relative cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-600 p-2 pr-10 rounded-2xl text-center md:text-lg lg:text-xl truncate"
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
    </div>
  );
};

export default HistoryBar;
