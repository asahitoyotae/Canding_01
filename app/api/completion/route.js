import "server-only";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      const url = "https://api.openai.com/v1/chat/completions";
      const key = process.env.SOME_KEY;
      const data = await req.json();
      console.log("data", data, "key", key);
      const header = {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      };
      const body = {
        model: data.version,
        messages: data.messages,
        temperature: 0.7,
        max_tokens: 500,
      };

      const response = axios.post(url, body, { headers: header });

      const timeoutResponse = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request Time Out!"));
        }, 20000);
      });

      const race = await Promise.race([response, timeoutResponse]);
      return new NextResponse(JSON.stringify(race.data));
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      return new NextResponse(
        JSON.stringify(error.response ? error.response.data : error.message)
      );
    }
  }
}
