"use client";

import React from "react";
import chatStore from "../store/conversation/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Recent = ({ active, setActive }) => {
  const {
    allThreads,
    setCurrentThreadId,
    setAllThreads,
    currentThreadId,
  } = chatStore();

  const deleteAllItem = () => {
    setAllThreads([]);
    setCurrentThreadId(null);
    setTimeout(() => {
      localStorage.removeItem("currentThreadId");
      localStorage.removeItem("allThreads");
    }, 0);
  };

  const deleteItem = (id) => {
    const all = [...allThreads];
    const filtered = all.filter((e) => e.thread_id != id);
    setAllThreads(filtered);
    if (id == currentThreadId) {
      setCurrentThreadId(null);
      localStorage.removeItem("currentThreadId");
    }
    setTimeout(() => {
      localStorage.setItem("allThreads", JSON.stringify(filtered));
    }, 0);
  };

  return (
    <div
      className={`recent ${
        active ? "recent_active" : "recent_inactive"
      } relative`}
    >
      {allThreads.length == 0 ? (
        <p className="w-full h-full flex items-center justify-center text-gray-500">
          (No Recent Activity)
        </p>
      ) : (
        allThreads.map((e, index) => {
          return (
            <div
              onClick={() => {
                setActive(false);
                setCurrentThreadId(e.thread_id);
                localStorage.setItem("currentThreadId", e.thread_id);
              }}
              key={index}
              className="history_item relative "
            >
              <p>{Date(e.thread_id)}</p>
              <p>{e.title}</p>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteItem(e.thread_id);
                }}
                className="trash_item"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
        })
      )}
      {allThreads.length > 0 && (
        <div
          className={`delete_container ${
            active ? "recent_active" : "recent_inactive"
          }`}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteAllItem();
            }}
            className="delete_all"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Delete all coversation</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Recent;
