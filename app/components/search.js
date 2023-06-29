"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./chats.css";
import { completion } from "../api/routes/route";
import chatStore from "../store/conversation/store";

const Search = ({ setResponse, setQuery }) => {
  const { allThreads, currentThreadId, animate } = chatStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.search.value.trim().length < 1 || animate) {
      return;
    }

    const userQuery = e.target.search.value;
    e.target.search.value = "";
    e.target.search.style.height = "20px";

    setQuery({ role: "user", content: userQuery });

    const message = [];
    const userCurrentQuery = { role: "user", content: userQuery };

    if (currentThreadId == null) {
      message.push(userCurrentQuery);
    } else {
      const currentThread = allThreads.find(
        (e) => e.thread_id == currentThreadId
      );
      for (let i = currentThread.conv.length - 1; i >= 0; i--) {
        if (message.length < 9) {
          message.unshift(currentThread.conv[i]);
        }
        message.push(userCurrentQuery);
      }
    }
    message.unshift({
      role: "system",
      content: "be polite always.",
    });
    const res = await completion(message);
    if (res) {
      const reply = res.choices[0].message;
      setResponse(reply);
    } else {
      setResponse({ role: "assistant", content: "An Error Occured" });
    }
  };

  const inputChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };
  return (
    <div className="search_bar text-black">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <textarea
          onChange={inputChange}
          type="text"
          name="search"
          placeholder="Aks me anything..."
          rows={1}
        />
        {!animate && (
          <button type="submit">
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
