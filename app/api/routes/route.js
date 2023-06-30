import axios from "axios";

export const completion = async (messages) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const key = process.env.SOME_KEY;
  const header = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  const body = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  };

  try {
    const response = await axios.post(url, body, { headers: header });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
