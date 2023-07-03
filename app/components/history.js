"use client";

import React, { useState } from "react";
import chatStore from "../store/conversation/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Recent = ({ active, setActive }) => {
  const {
    animate,
    allThreads,
    setCurrentThreadId,
    setAllThreads,
    currentThreadId,
  } = chatStore();
  const [deleted, setDeleted] = useState(null);

  const deleteAllItem = () => {
    setAllThreads([]);
    setCurrentThreadId(null);
    setTimeout(() => {
      localStorage.removeItem("currentThreadId");
      localStorage.removeItem("allThreads");
    }, 0);
  };

  const deleteItem = (id) => {
    setTimeout(() => {
      const all = [...allThreads];
      const filtered = all.filter((e) => e.thread_id != id);
      setAllThreads(filtered);
      if (id == currentThreadId) {
        setCurrentThreadId(null);
        localStorage.removeItem("currentThreadId");
      }
      localStorage.setItem("allThreads", JSON.stringify(filtered));
    }, 500);
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
          const date = new Date(JSON.parse(e.thread_id));
          return (
            <div
              onClick={() => {
                if (animate) return;
                setActive(false);
                setCurrentThreadId(e.thread_id);
                localStorage.setItem("currentThreadId", e.thread_id);
              }}
              key={index}
              className={`history_item relative ${
                deleted == e.thread_id ? "delete_animation" : ""
              }`}
              style={{ top: `${50 + 75 * index}px` }}
            >
              <p>{`${date.getFullYear()}-${
                months[date.getMonth() + 1]
              }-${date.getDate()}   (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`}</p>
              <p>{e.title}</p>
              <div
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  deleteItem(e.thread_id);
                  setDeleted(e.thread_id);
                }}
                className="trash_item"
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          );
        })
      )}
      <div
        className="spacer"
        style={{ top: `${50 + 75 * allThreads.length}px` }}
      ></div>
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
