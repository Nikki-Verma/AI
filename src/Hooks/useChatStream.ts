import { decodeStreamToJson, getStream } from "@/utils/stream";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const SimplAi_ERROR_MESSAGE = "Something went wrong fetching AI response.";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ChatMessage = {
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
  options: UseChatStreamOptions;
  method: UseChatStreamInputMethod;
};

const useChatStream = (input: UseChatStreamInput) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchAndUpdateAIResponse = async (message: string) => {
    const stream = await getStream(message, input.options, input.method);
    if (!stream) throw new Error();

    addMessageToChat("", "SimplAi");

    streamRef.current = stream.getReader();
    for await (const message of decodeStreamToJson(streamRef.current)) {
      appendMessageToChat(message);
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
    e?.preventDefault();
    addMessageToChat(newMessage ?? message);
    setMessage("");

    try {
      await fetchAndUpdateAIResponse(newMessage ?? message);
    } catch {
      addMessageToChat(SimplAi_ERROR_MESSAGE, "SimplAi");
    } finally {
      streamRef.current = undefined;
    }

    setIsLoading(false);
  };

  return {
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
