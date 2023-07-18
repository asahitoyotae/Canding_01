"use client";

import Image from "next/image";
import Conversations from "./components/conversation";
import Search from "./components/search";
import { useEffect, useState } from "react";
import chatStore from "./store/conversation/store";
import jwt from "jsonwebtoken";
import paymentStore from "./payment/storePayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [response, setResponse] = useState({});
  const [query, setQuery] = useState({});
  const { setAllThreads, setCurrentThreadId } = chatStore();
  const [size, setSize] = useState();
  const { showPaypal, setShowPaypal } = paymentStore();
  const [hacker, setHacker] = useState(false);

  useEffect(() => {
    // const desktopDevices = [
    //   "Win32",
    //   "Win64",
    //   "MacIntel",
    //   "Linux x86_64",
    //   "Linux i686",
    //   "Linux armv7l",
    // ];

    // const userDevice = navigator.platform;
    // if (desktopDevices.includes(userDevice)) {
    //   localStorage.clear();
    // }

    // const hacker = window.innerWidth;

    // if (desktopDevices.includes(userDevice) || hacker > 654) {
    //   localStorage.clear();
    //   setHacker(true);
    //   return;
    // }

    // const paidUser = localStorage.getItem("__validity__");
    // if (paidUser) {
    //   jwt.verify(
    //     paidUser,
    //     process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
    //     (error, decoded) => {
    //       if (error) {
    //         setShowPaypal(true);
    //       }
    //     }
    //   );
    // } else if (!paidUser) {
    //   const newUser = localStorage.getItem("__new-user-validity__");
    //   if (!newUser) {
    //     const forNewUserToken = jwt.sign(
    //       { numberOfRequest: 3 },
    //       process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
    //       { expiresIn: "7d" },
    //       (error, token) => {
    //         if (error) {
    //           localStorage.setItem(
    //             "__new-user-validity__",
    //             jwt.sign(
    //               { numberOfRequest: 3 },
    //               process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
    //               { expiresIn: "7d" }
    //             )
    //           );
    //         } else {
    //           localStorage.setItem("__new-user-validity__", token);
    //         }
    //       }
    //     );
    //   } else if (newUser) {
    //     setShowPaypal(true);
    //   }
    // }

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

  if (hacker) {
    return;
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-2 relative">
      <FontAwesomeIcon
        icon={faDiceD20}
        style={{
          width: "60px",
          height: "60px",
          color: "rgb(58, 58, 58)",
          marginTop: "30px",
        }}
      />
      <div className="font-bold text-center text-xl">Canding</div>
      <div className=" text-center text-sm">Your daily AI Writing Asistant</div>
      <div className="mt-3 mb-3 px-4 py-1 text-black  border rounded-md">
        Examples
      </div>
      <div className="text-gray-500 px-4 py-1 text-center mb-3 rounded-md border">
        Write an article about the effects of social media on mental health and
        well-being.
      </div>
      <div className="text-gray-500 px-4 py-1  text-center mb-3 rounded-md border">
        Write a function in javascript that fetch data from a public API.
      </div>
      {/* <p className="rounded-md bg-orange-500 px-4 py-1 text-white text-center">
        this section is for development purpose only,
        {` your screen width is: [${size} px]`}
      </p> */}
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
