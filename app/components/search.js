"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./chats.css";
import chatStore from "../store/conversation/store";
import { deleteTrash } from "../utils/gaisano/trash";
import paymentStore from "../payment/storePayment";
import jwt from "jsonwebtoken";

const Search = ({ setResponse, setQuery }) => {
  const {
    allThreads,
    currentThreadId,
    prime,
    animate,
    gptVersion,
  } = chatStore();
  const { setShowPaypal } = paymentStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkingValidity = await new Promise((resolve, reject) => {
      const isPremium = localStorage.getItem("__validity__");

      if (!isPremium) {
        const isNewUser = localStorage.getItem("__new-user-validity__");
        jwt.verify(
          isNewUser,
          process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
          (err, dec) => {
            if (err) {
              resolve(false);
            } else {
              if (dec.numberOfRequest < 1 || dec.numberOfRequest > 3) {
                resolve(false);
              } else {
                const newNumb = dec.numberOfRequest - 1;
                localStorage.setItem(
                  "__new-user-validity__",
                  jwt.sign(
                    { numberOfRequest: newNumb },
                    process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
                    { expiresIn: "7d" }
                  )
                );
                resolve(true);
              }
            }
          }
        );
      } else {
        jwt.verify(
          isPremium,
          process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
          (error, decoded) => {
            if (error) {
              console.log("error in process premium token");
              resolve(false);
            } else {
              resolve(true);
            }
          }
        );
      }
    });

    console.log("check validity", checkingValidity);

    if (!checkingValidity) {
      return setShowPaypal(true);
    }

    if (e.target.search.value.trim().length < 1 || animate) {
      return;
    }

    const userQuery = e.target.search.value;
    e.target.search.value = "";
    e.target.search.style.height = "fit-content";

    setQuery({ role: "user", content: userQuery });

    const message = [];
    const userCurrentQuery = { role: "user", content: userQuery };

    if (currentThreadId == null) {
      message.push(userCurrentQuery);
    } else {
      const currentThread = allThreads.find((e) => {
        return e.thread_id == currentThreadId;
      });
      for (let i = currentThread.conv.length - 1; i >= 0; i--) {
        let totalWords = 0;
        message.forEach((item) => {
          totalWords += item.content.split(" ").length;
        });
        if (message.length < 9 && totalWords < 2000) {
          message.unshift(currentThread.conv[i]);
        }
      }
      message.push(userCurrentQuery);
    }
    message.unshift({
      role: "system",
      content: "be polite always.",
    });

    const res = await deleteTrash(message, {
      core: prime,
      version: gptVersion,
    });

    if (res.choices) {
      const reply = res.choices[0].message;
      setResponse(reply);
    } else {
      setResponse({
        role: "assistant",
        content: `Network Error!`,
      });
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
          placeholder="Ask me anything..."
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
