import { Headers, Params } from "@/Hooks/useApi";
import {
  UseChatStreamInputMethod,
  UseChatStreamOptions,
} from "@/Hooks/useChatStream";
import _authHttp from "@/services/_http";
import { v4 } from "uuid";
import config from "./apiEndoints";
import {
  DUMMY_SELLER_ID,
  DUMMY_SELLER_PROFILE_ID,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
} from "./constants";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  [X_SELLER_ID]: DUMMY_SELLER_ID,
  [X_SELLER_PROFILE_ID]: DUMMY_SELLER_PROFILE_ID,
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

  if (response.status === 102) return getStream(cId, mId, headers);

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};

export const getChatDetails = async (
  chatId: string,
  params?: Params,
  headers?: Headers,
) => {
  const response = await _authHttp.get(
    `${config.intract.chatDetails}/${chatId}`,
    {
      params,
      headers: { ...DEFAULT_HEADERS, ...headers },
    },
  );
  if (response?.status !== 200)
    throw new Error("Error while fetching chat details");

  const chatMessage =
    response?.data?.result?.response?.flatMap((chat: any) => {
      console.log("🚀 ~ chatMessage ~ chat:", chat);

      const userMessage = {
        role: "user",
        content: chat?.query?.message || "",
        id: v4(),
      };
      const SimplAiMessage = {
        role: "SimplAi",
        content: chat?.query_result || "",
        id: v4(),
      };
      return [userMessage, SimplAiMessage];
    }) || [];

  return chatMessage;
};

export async function* decodeStreamToJson(
  reader: any,
): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    if (value) {
      var find = "data:";
      var re = new RegExp(find, "g");
      const decodedValue = decoder?.decode(value)?.replace(re, "").trim();

      if (decodedValue.trim().toUpperCase() == "PROCESSING") {
        yield "refetch";
        break;
      }
      try {
        yield decodedValue;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
