import "server-only";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method === "POST") {
    const url = "https://api.openai.com/v1/chat/completions";
    const key = process.env.SOME_KEY;
    const data = await req.json();
    console.log(data);
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

    try {
      const response = axios.post(url, body, { headers: header });

      const timeoutResponse = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request Time Out!"));
        }, 20000);
      });

      const race = await Promise.race([response, timeoutResponse]);
      return new NextResponse(JSON.stringify(race.data));
    } catch (error) {
      console.log(error.response.data);
      return new NextResponse(JSON.stringify(error.response.data));
    }
  }
}
