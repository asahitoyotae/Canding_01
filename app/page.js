"use client";

import Image from "next/image";
import Conversations from "./components/conversation";
import Search from "./components/search";
import { useEffect, useState } from "react";
import chatStore from "./store/conversation/store";

export default function Home() {
  const [response, setResponse] = useState({});
  const [query, setQuery] = useState({});
  const { setAllThreads, setCurrentThreadId } = chatStore();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("allThreads"));
    const id = JSON.parse(localStorage.getItem("currentThreadId"));
    storage && setAllThreads(storage);
    id && setCurrentThreadId(id);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 px-2 relative">
      Hello world
      <Conversations query={query} response={response} />
      <Search setQuery={setQuery} setResponse={setResponse} />
    </main>
  );
}
