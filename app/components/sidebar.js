"use client";

import {
  faComments,
  faComment,
  faTrashCan,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faRotateRight, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import chatStore from "../store/conversation/store";
import Recent from "./history";

const Sidebar = () => {
  const [recent, setRecent] = useState(false);
  const { setCurrentThreadId, currentThreadId, animate } = chatStore();

  return (
    <div className="sidebar">
      <div className="mobile_sidebar">
        <Image
          src="/ChatGPT_350x350.png"
          alt="Chat Codex"
          width={30}
          height={30}
        />
        <span className="ml-2 font-bold">Canding</span>
      </div>
      <div className="mobile_buttons">
        <div
          onClick={() => {
            if (animate) {
              return;
            }
            localStorage.removeItem("currentThreadId");
            setCurrentThreadId(null);
            setRecent(false);
          }}
          className={`flex items-center justify-center px-3 py-1 rounded-lg ${
            !currentThreadId && !recent ? "button_active" : "button_inactive"
          } ${animate ? "bg-red-100" : ""}`}
        >
          <FontAwesomeIcon
            icon={faMessage}
            style={{ width: "15px", height: "15px" }}
          />
          <span className="ml-3">new</span>
        </div>
        <div
          onClick={() => setRecent(false)}
          className={`flex items-center justify-center px-3 py-1 rounded-lg ${
            currentThreadId && !recent ? "button_active" : "button_inactive"
          }`}
        >
          <FontAwesomeIcon
            icon={faComments}
            style={{ width: "20px", height: "20px" }}
          />
          <span className="ml-3">chat</span>
        </div>
        <button
          onClick={() => setRecent(true)}
          className={`flex items-center justify-center px-3 py-1 rounded-lg ${
            !recent ? "button_inactive" : "button_active"
          }`}
        >
          <FontAwesomeIcon
            icon={faRotateRight}
            style={{ width: "16px", height: "16px" }}
          />
          <span className="ml-3">history</span>
        </button>
        <Recent active={recent} setActive={setRecent} />
      </div>
      <div className="disktop_sidebar">
        <div className="flex items-center justify-center my-10">
          <Image
            src="/ChatGPT_350x350.png"
            alt="Chat Codex"
            width={40}
            height={40}
          />
          <span className="ml-2 font-bold text-lg">Canding</span>
        </div>
        <div className="w-full rounded-lg border hover:bg-gray-100 hover:duration-500 py-3 duration-500 flex item-center justify-center">
          <FontAwesomeIcon
            icon={faComment}
            style={{ width: "18px", height: "18px" }}
          />
          <span className="text-sm ml-7">New Thread</span>
        </div>
        <div className="flex-1"></div>
        <div className="w-full">
          <div className="my-2 w-full rounded-lg border hover:bg-gray-100 hover:duration-500 py-3 duration-500 flex item-center justify-center">
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ width: "18px", height: "18px" }}
            />
            <span className="text-sm ml-7">Delete all Threads</span>
          </div>
          <div className="w-full rounded-lg border hover:bg-gray-100 hover:duration-500 py-3 duration-500 flex item-center justify-center">
            <FontAwesomeIcon
              icon={faVolumeHigh}
              style={{ width: "18px", height: "18px" }}
            />
            <span className="text-sm ml-7">Spoken Responses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
