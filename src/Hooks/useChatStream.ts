import { initiateConversationApi } from "@/api/intract";
import { decodeStreamToJson, getStream } from "@/utils/stream";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const SimplAi_ERROR_MESSAGE = "Something went wrong fetching AI response.";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ChatMessage = {
  role: "SimplAi" | "user";
  content: string;
  id: string;
};

export type UseChatStreamOptions = {
  url: string;
  method: HttpMethod;
  query?: Record<string, string>;
  headers?: HeadersInit;
  body?: Record<string, string>;
};

export type UseChatStreamInputMethod = {
  type: "body" | "query";
  key: string;
};

type UseChatStreamInput = {
  convId?: string;
  messages?: ChatMessage[];
};

const useChatStream = (input: UseChatStreamInput) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    input?.messages ?? []
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(input?.convId);

  let streamRef = useRef<any>();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const addMessageToChat = (
    message: string,
    role: ChatMessage["role"] = "user"
  ) => {
    setMessages((messages) => [
      ...messages,
      { role, content: message, id: uuidv4() },
    ]);
  };

  const appendMessageToChat = (message: string) => {
    setMessages((messages) => {
      const latestMessage = messages[messages.length - 1];

      return [
        ...messages.slice(0, -1),
        { ...latestMessage, content: latestMessage.content + message },
      ];
    });
  };

  const fetchAndUpdateAIResponse = async (
    messageID: string,
    conversationID: string
  ) => {
    try {
      const stream = await getStream(conversationID, messageID);
      console.log("🚀 ~ useChatStream ~ messageID:", messageID);
      console.log("🚀 ~ useChatStream ~ conversationID:", conversationID);
      console.log("🚀 ~ useChatStream ~ stream:", stream);
      if (!stream) throw new Error();

      addMessageToChat("", "SimplAi");

      streamRef.current = stream.getReader();
      for await (const message of decodeStreamToJson(streamRef.current)) {
        // if (message === "refetch") {
        //   fetchAndUpdateAIResponse(messageID, conversationID);
        //   break;
        // }
        appendMessageToChat(message);
      }
    } catch (error: any) {
      // console.log("error while stream response", error?.response);
      // console.log("error while stream data", error?.response);
    }
  };

  const stopStream = () => {
    if (!streamRef.current) {
      return null;
    } else {
      streamRef?.current?.cancel();
      streamRef.current = undefined;
    }
  };

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    newMessage?: string
  ) => {
    setIsLoading(true);
    // e?.preventDefault();
    addMessageToChat(newMessage ?? message);
    setMessage("");

    try {
      const res = await initiateConversationApi({
        payload: {
          action: conversationId ? "START_SCREEN" : "START_SCREEN",
          model: "abc",
          language_code: "EN",
          source: "APP",
          query: {
            message: newMessage ?? message,
            message_type: "text",
            message_category: "",
          },
          conversation_id: conversationId,
        },
        headers: {
          "X-SELLER-ID": "1",
          "X-USER-ID": "1",
          "X-SELLER-PROFILE-ID": "11",
        },
      });
      if (res?.data?.result?.conversation_id) {
        if (
          !conversationId ||
          res?.data?.result?.conversation_id != conversationId
        ) {
          setConversationId(res?.data?.result?.conversation_id);
        }

        await fetchAndUpdateAIResponse(
          res?.data?.result?.message_id,
          res?.data?.result?.conversation_id
        );
      }
    } catch {
      addMessageToChat(SimplAi_ERROR_MESSAGE, "SimplAi");
    } finally {
      streamRef.current = undefined;
    }

    setIsLoading(false);
  };

  return {
    conversationId,
    setConversationId,
    messages,
    setMessages,
    input: message,
    setInput: setMessage,
    handleInputChange,
    handleSubmit,
    isLoading,
    stopStream,
  };
};

export default useChatStream;
