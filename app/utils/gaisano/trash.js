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
  const invoices = [
    obj[0],
    mod.val,
    mod.valid,
    obj[1],
    half.term,
    half.caned,
    obj[2],
    tr.nor,
    tr.name,
    obj[3],
  ];
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${invoices.join("")}`,
  };
  const body = {
    model: version.version,
    messages: messages,
    temperature: 0.7,
    max_tokens: 800,
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
