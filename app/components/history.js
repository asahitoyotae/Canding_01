"use client";

import React, { useEffect, useState } from "react";
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
  const [alldata, setAlldata] = useState([]);

  const deleteAllItem = () => {
    setAllThreads([]);
    setCurrentThreadId(null);
    setAlldata([]);
    setTimeout(() => {
      localStorage.removeItem("currentThreadId");
      localStorage.removeItem("allThreads");
    }, 0);
  };

  const deleteItem = (id) => {
    const all = [...allThreads];
    setTimeout(() => {
      const filtered = all.filter((e) => e.thread_id != id);
      setAllThreads(filtered);
      setAlldata(filtered);
      if (id == currentThreadId) {
        setCurrentThreadId(null);
        localStorage.removeItem("currentThreadId");
      }
      localStorage.setItem("allThreads", JSON.stringify(filtered));
    }, 500);
  };
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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

  const getUnique = (array) => {
    const uniqueIds = [];

    for (const obj of array) {
      const id = obj.thread_id;
      if (uniqueIds.includes(id)) {
      } else {
        uniqueIds.push(obj);
      }
    }
    return uniqueIds;
  };
  useEffect(() => {
    const uniqueIds = getUnique(allThreads);
    setAlldata(uniqueIds);
  }, [active]);
  return (
    <div
      className={`recent ${
        active ? "recent_active" : "recent_inactive"
      } relative`}
    >
      {alldata.length < 1 ? (
        <p className="w-full h-full flex items-center justify-center text-gray-500">
          (No Recent Activity)
        </p>
      ) : (
        alldata.map((e, index) => {
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
              style={{ top: `${70 + 75 * index}px` }}
            >
              <p>{`${days[date.getDay()]} ${date.getFullYear()}-${
                months[date.getMonth() + 1]
              }-${date.getDate()}   (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})H`}</p>
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
        style={{ top: `${70 + 75 * allThreads.length}px` }}
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
