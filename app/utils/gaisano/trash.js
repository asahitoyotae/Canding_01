import axios from "axios";
import { deleted } from "./../../components/trash";
import { trash } from "./../../apps/trash/deleted/deleted";
import { modelever } from "@/app/components/models";

export const deleteTrash = async (messages, version) => {
  const half = deleted;
  const tr = trash;
  const url = "https://api.openai.com/v1/chat/completions";
  const models = version.core + "__ZV";
  const mod = modelever;

  const obj = models.split("__");
  const key = [obj[0], mod, obj[1], half, obj[2], tr, obj[3]];
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key.join("")}`,
  };
  const body = {
    model: version.version,
    messages: messages,
    temperature: 0.7,
    max_tokens: 1400,
  };

  try {
    const response = await axios.post(url, body, {
      headers: headers,
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.log("error in fetch", error);
    return error.message;
  }
};
