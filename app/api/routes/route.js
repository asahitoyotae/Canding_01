"use server";

import chatStore from "@/app/store/conversation/store";
import axios from "axios";

export const completion = async (messages, version) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const key = process.env.SOME_KEY;
  console.log(key);
  const header = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  const body = {
    model: version,
    messages: messages,
    temperature: 0.7,
    max_tokens: 500,
  };

  try {
    const response = axios.post(url, body, { headers: header });

    const timeoutResponse = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request Time Out!"));
      }, 20000);
    });

    const race = await Promise.race([response, timeoutResponse]);
    console.log(race.data);
    return race.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
