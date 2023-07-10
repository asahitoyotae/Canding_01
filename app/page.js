"use client";

import Image from "next/image";
import Conversations from "./components/conversation";
import Search from "./components/search";
import { useEffect, useState } from "react";
import chatStore from "./store/conversation/store";
import jwt from "jsonwebtoken";
import paymentStore from "./payment/storePayment";

export default function Home() {
  const [response, setResponse] = useState({});
  const [query, setQuery] = useState({});
  const { setAllThreads, setCurrentThreadId } = chatStore();
  const [size, setSize] = useState();
  const { showPaypal, setShowPaypal } = paymentStore();

  useEffect(() => {
    const newUser = localStorage.getItem("__new-user-validity__");
    if (!newUser) {
      const forNewUserToken = jwt.sign(
        { numberOfRequest: 3 },
        process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
        { expiresIn: "7d" },
        (error, token) => {
          if (error) {
            localStorage.setItem(
              "__new-user-validity__",
              jwt.sign(
                { numberOfRequest: 3 },
                process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
                { expiresIn: "7d" }
              )
            );
          } else {
            localStorage.setItem("__new-user-validity__", token);
          }
        }
      );
    } else if (newUser) {
      const premiumUser = localStorage.getItem("__validity__");
      premiumUser ? "" : setShowPaypal(true);
    }

    setSize(window.innerWidth);
    if (window.innerWidth > 500) {
      document.body.style.setProperty("--global-font-size", "1rem");
    } else if (window.innerWidth > 400 && window.innerWidth < 500) {
      document.body.style.setProperty("--global-font-size", "0.9rem");
    } else if (window.innerWidth < 400) {
      document.body.style.setProperty("--global-font-size", "0.8rem");
    }
    const storage = JSON.parse(localStorage.getItem("allThreads"));
    const id = JSON.parse(localStorage.getItem("currentThreadId"));
    storage && setAllThreads(storage);
    id && setCurrentThreadId(id);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-2 relative">
      <div className="mb-5">Hello world</div>
      <p className="mb-6 rounded-md bg-orange-500 px-4 py-1 text-white text-center">
        this section is for development purpose only,
        {` your screen width is: [${size} px]`}
      </p>
      <Conversations
        setQuery={setQuery}
        setResponse={setResponse}
        query={query}
        response={response}
      />
      <Search setQuery={setQuery} setResponse={setResponse} />
    </main>
  );
}
