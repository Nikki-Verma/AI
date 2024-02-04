import {
  UseChatStreamInputMethod,
  UseChatStreamOptions,
} from "@/Hooks/useChatStream";
import config from "./apiEndoints";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "X-SELLER-ID": "1",
  "X-USER-ID": "1",
  "X-SELLER-PROFILE-ID": "11",
};

const mergeInputInOptions = (
  input: string,
  options: UseChatStreamOptions,
  method: UseChatStreamInputMethod,
) => {
  // options.query = options.query ?? {};
  // (options[method.type] as Record<string, unknown>)[method.key] = input;

  (options[method.type] ?? {})[method.key] = input;

  return options;
};

export const getStream = async (
  cId: string,
  mId: string,
  headers: HeadersInit = {},
): Promise<any> => {
  const query = {
    cId,
    mId,
  };

  const params = "?" + new URLSearchParams(query).toString();

  const response = await fetch(config.intract.streamResponse + params, {
    method: "GET",
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  });
  console.log("🚀 ~ response:", response);
  if (response.status === 102) return getStream(cId, mId, headers);

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};

export async function* decodeStreamToJson(
  reader: any,
): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    console.log("🚀 ~ value:", value);

    if (done) break;

    if (value) {
      var find = "data:";
      var re = new RegExp(find, "g");
      const decodedValue = decoder?.decode(value)?.replace(re, "").trim();
      console.log("🚀 ~ decodedValue:", decodedValue);
      if (decodedValue.trim().toUpperCase() == "PROCESSING") {
        yield "refetch";
        break;
      }
      try {
        yield decoder?.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
