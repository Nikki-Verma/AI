import { Headers, Params } from "@/Hooks/useApi";
import {
  UseChatStreamInputMethod,
  UseChatStreamOptions,
} from "@/Hooks/useChatStream";
import _authHttp from "@/services/_http";
import { getSession } from "next-auth/react";
import { v4 } from "uuid";
import config from "./apiEndoints";
import {
  PIM_SID,
  X_CLIENT_ID,
  X_DEVICE_ID,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
  X_TENANT_ID,
  X_USER_ID,
} from "./constants";

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

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
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

  if (response.status === 511) {
    const session: any = await getSession();
    return await getStream(cId, mId, {
      ...headers,
      [X_USER_ID]: session?.user?.details?.id,
      [X_SELLER_ID]: session?.user?.details?.id,
      [X_SELLER_PROFILE_ID]: session?.user?.details?.id,
      [X_TENANT_ID]: session?.user?.details?.tenantId,
      [PIM_SID]: session?.accessToken,
      [X_DEVICE_ID]: "armaze-web",
      [X_CLIENT_ID]: session?.user?.details?.id,
    });
  }
  if (response.status === 102) return await getStream(cId, mId, headers);

  if (!response.ok) throw new Error(response.statusText);

  return { headers: response.headers, stream: response.body };
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
