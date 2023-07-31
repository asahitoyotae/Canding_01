"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typewriter from "typewriter-effect";

import "./chats.css";
import "./thinking.css";
import "./choices.css";
import chatStore from "../store/conversation/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faStop } from "@fortawesome/free-solid-svg-icons";

const Conversations = ({ query, response, setQuery, setResponse }) => {
  const {
    allThreads,
    currentThreadId,
    setAllThreads,
    setCurrentThreadId,
    setAnimate,
    setAlert,
  } = chatStore();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [content, setContent] = useState("");
  let [dots, setDots] = useState(".");
  const [thinking, setThinking] = useState(false);
  const veiwref = useRef(null);

  useEffect(() => {
    if (!currentThreadId) {
      setConversation([]);
      return;
    } else {
      if (allThreads.length > 0) {
        const theThread = allThreads.find((e) => {
          return e.thread_id == `${currentThreadId}`;
        });

        setCurrentChat(theThread);
        setConversation(theThread.conv);
      }
    }
  }, [currentThreadId]);

  useEffect(() => {
    if (!query.content || query.content == "") return;
    const threads = [...allThreads];
    if (currentThreadId == null) {
      const newChat = {
        thread_id: `${Date.now()}`,
        title:
          query.content.length > 40
            ? query.content.slice(0, 40) + "..."
            : query.content,
        conv: [{ ...query }],
      };
      threads.unshift(newChat);
      setAllThreads(threads);
      setCurrentThreadId(newChat.thread_id);
      setAnimate(true);
      localStorage.setItem("allThreads", JSON.stringify(threads));
      localStorage.setItem("currentThreadId", newChat.thread_id);
      setThinking(true);
      setConversation(newChat.conv);
      setTimeout(() => {
        setQuery({});
      }, 10);
    } else {
      const index = threads.findIndex(
        (e) => e.thread_id == `${currentThreadId}`
      );
      threads.splice(index, 1);
      currentChat.conv.push(query);
      threads.unshift(currentChat);
      setAllThreads(threads);
      setAnimate(true);
      localStorage.setItem("allThreads", JSON.stringify(threads));
      setConversation(currentChat.conv);
      setThinking(true);
      setTimeout(() => {
        setQuery({});
      }, 10);
    }
  }, [query.content]);

  useEffect(() => {
    if (!response.content) return;

    setAnimating(true);

    let textContent = "";
    const text = response.content;

    text.split("```").forEach((e, i) => {
      if (i % 2 == 0) {
        let insideText = "";
        e.trim()
          .split("`")
          .forEach((r, t) => {
            if (t % 2 == 0) {
              insideText += `<span>${r}</span>`;
            } else {
              insideText += `<span class="px-1 bg-gray-600 text-white rounded-md mx-1">${r}</span>`;
            }
          });
        textContent += `<pre class="custom_pre font-sans" ><p>${insideText}</p></pre>`;
      } else {
        textContent +=
          "<pre class='px-2 py-1 rounded-md bg-gray-600 text-white overflow-x-auto my-1'><code>" +
          `${e.trim()}` +
          "</code></pre>";
      }
    });
    setContent(textContent);
    setThinking(false);
  }, [response.content]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.split(" ").length >= 3 ? "." : prevDots + " ."
      );
    }, 500);
    if (!thinking) {
      setDots(".");
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [thinking]);

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      veiwref.current?.scrollIntoView({
        behavior: "smooth",
      });
    };
    setTimeout(() => {
      scrollToBottom();
    }, 10);
  }, [query.content, currentThreadId]);

  const [copied, setCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState();
  const handleCopyCode = (text, item) => {
    try {
      Android.copyToClipboard(text);
      setCopied(true);
      setCopiedItem(item);
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setCopiedItem(null);
  }, [currentThreadId]);

  const handleSnap = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimating(false);
      const threads = [...allThreads];
      threads[0].conv.push(response);
      localStorage.setItem("allThreads", JSON.stringify(threads));
      setAllThreads(threads);
      setResponse({});
    }, 0);
  };

  return (
    <div className="conversations text-black">
      {conversation.length > 0 &&
        conversation.map((item, index) => {
          if (item.role === "user") {
            return (
              <div key={`user-${index}`} className="flex w-full mb-2">
                <div className="flex-1"></div>
                <div className="user_chat">{item.content}</div>
              </div>
            );
          } else if (item.role === "assistant") {
            return (
              <div key={`assistant-${index}`} className="flex w-full mb-2">
                <div className="assistant_chat">
                  {item.content &&
                    item.content.split("```").map((text, ind) => {
                      if (ind % 2 === 0) {
                        return (
                          <pre
                            key={`text-${ind}`}
                            className="custom_pre font-sans"
                          >
                            <p>
                              {text
                                .trim()
                                .split("`")
                                .map((e, i) => {
                                  if (i % 2 === 0) {
                                    return (
                                      <span key={`pre-${i}-${ind}`}>{e}</span>
                                    );
                                  } else {
                                    return (
                                      <span
                                        key={`smcode-${i}-${ind}`}
                                        className="px-1 bg-gray-600 text-white rounded-md mx-1"
                                      >
                                        {e}
                                      </span>
                                    );
                                  }
                                })}
                              {ind == item.content.split("```").length - 1 && (
                                <span
                                  onClick={() =>
                                    handleCopyCode(
                                      item.content.trim(),
                                      `text-${ind}-${index}`
                                    )
                                  }
                                  className=" ml-4"
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      copied &&
                                      copiedItem == `text-${ind}-${index}`
                                        ? faCheck
                                        : faCopy
                                    }
                                    style={{
                                      widht: "16px",
                                      height: "16px",
                                      color:
                                        copied &&
                                        copiedItem == `text-${ind}-${index}`
                                          ? "lightgreen"
                                          : "rgb(89, 89, 89)",
                                    }}
                                  />
                                </span>
                              )}
                            </p>
                          </pre>
                        );
                      } else {
                        return (
                          <pre
                            key={`code-${ind}`}
                            className="code_container relative px-2 py-1 rounded-md bg-gray-600 text-white overflow-x-auto my-1"
                          >
                            <span
                              className="copy_icon"
                              onClick={() =>
                                handleCopyCode(
                                  text.trim(),
                                  `code-${ind}-${index}`
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={
                                  copied && copiedItem == `code-${ind}-${index}`
                                    ? faCheck
                                    : faCopy
                                }
                                style={{
                                  color:
                                    copied &&
                                    copiedItem == `code-${ind}-${index}`
                                      ? "lightgreen"
                                      : "white",
                                  width: "16px",
                                  height: "16px",
                                }}
                              />
                            </span>
                            <code>{text.trim()}</code>
                          </pre>
                        );
                      }
                    })}
                </div>

                <div className="flex-1"></div>
              </div>
            );
          }
        })}
      {animating && (
        <div className="flex w-full mb-2">
          <div className="assistant_chat  font-sans">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(10)
                  .callFunction(() => {
                    document.querySelector(".Typewriter__cursor").remove();
                  })
                  .typeString(content)
                  .callFunction(() => {
                    setAnimating(false);
                    setAnimate(false);
                    setTimeout(() => {
                      const threads = [...allThreads];
                      threads[0].conv.push(response);
                      localStorage.setItem(
                        "allThreads",
                        JSON.stringify(threads)
                      );
                      setAllThreads(threads);
                      setResponse({});
                    }, 0);
                  })
                  .start();
              }}
            />
          </div>
        </div>
      )}
      {thinking && (
        <div className="flex w-full mb-2">
          <div className="assistant_chat flex gap-1">{dots}</div>
        </div>
      )}
      {animating && (
        <div onClick={handleSnap} className="snap_result">
          <FontAwesomeIcon
            icon={faStop}
            style={{ width: "16px", height: "16px", color: "rgb(57, 57, 57)" }}
          />

          <span>snap</span>
        </div>
      )}
      <div className="mb-32" ref={veiwref}></div>
    </div>
  );
};

export default Conversations;
