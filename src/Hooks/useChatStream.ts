import { initiateConversationApi } from "@/api/intract";
import {
  PIM_SID,
  X_CLIENT_ID,
  X_DEVICE_ID,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
  X_TENANT_ID,
  X_USER_ID,
} from "@/utils/constants";
import { decodeStreamToJson, getChatDetails, getStream } from "@/utils/stream";
import { UnknownObject } from "@/utils/types";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

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

interface chatConfig {
  model: string;
  language_code?: string;
  source?: string;
  app_id: string;
  model_id: string;
}

type UseChatStreamInput = {
  convId?: string;
  messages?: ChatMessage[];
  chatConfig?: chatConfig;
  customAttributes?: UnknownObject | undefined | null;
};

const useChatStream = (input: UseChatStreamInput) => {
  const { data }: any = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>(
    input?.messages ?? [],
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatStreaming, setChatStreaming] = useState(false);
  const [conversationId, setConversationId] = useState(input?.convId);
  const [changeConversationLoading, setChangeConversationLoading] =
    useState(false);
  const [chatConfig, setChatConfig] = useState(
    input?.chatConfig ?? {
      model: "abc",
      language_code: "EN",
      source: "APP",
    },
  );

  const [custAtrr, setCustAtrr] = useState(input?.customAttributes);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  const resetCustAtrr = () => {
    stopStream();
    setCustAtrr(undefined);
  };

  let streamRef = useRef<any>();
  let stopStreamRef = useRef<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(e?.target?.value);
  };

  const changeConversation = async (convId: string | undefined) => {
    try {
      stopStream();
      setChangeConversationLoading(true);
      setConversationId(convId);
      setMessage("");
      if (convId) {
        setMessages([]);
        const chatDetails = await getChatDetails(convId, {
          userId: data?.user?.details?.id,
        });
        setMessages(chatDetails);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    } finally {
      setChangeConversationLoading(false);
    }
  };

  const addMessageToChat = (
    message: string,
    role: ChatMessage["role"] = "user",
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
        { ...latestMessage, content: `${latestMessage.content}${message}` },
      ];
    });
  };

  const replaceMessageToChat = (message: string) => {
    setMessages((messages) => {
      const latestMessage = messages[messages.length - 1];
      return [...messages.slice(0, -1), { ...latestMessage, content: message }];
    });
  };

  const fetchAndUpdateAIResponse = async (
    messageID: string,
    conversationID: string,
    loadingState: boolean = true,
  ) => {
    try {
      if (loadingState) setIsLoading(true);
      setChatStreaming(true);
      const { headers, stream } = await getStream(conversationID, messageID, {
        [X_USER_ID]: data?.user?.details?.id,
        [X_SELLER_ID]: data?.user?.details?.id,
        [X_SELLER_PROFILE_ID]: data?.user?.details?.id,
        [X_TENANT_ID]: data?.user?.details?.tenantId,
        [PIM_SID]: data?.accessToken,
        [X_DEVICE_ID]: "armaze-web",
        [X_CLIENT_ID]: data?.user?.details?.id,
      });

      if (!stream) throw new Error();

      streamRef.current = stream.getReader();
      for await (const message of decodeStreamToJson(streamRef.current)) {
        if (stopStreamRef.current) {
          console.log("stop streaming called");
          stopStreamRef.current = false;
          setChatStreaming(false);
          setIsLoading(false);
          break;
        }
        if (message === "refetch") {
          setTimeout(() => {
            fetchAndUpdateAIResponse(messageID, conversationID);
          }, 50);
          break;
        }
        setIsLoading(false);
        replaceMessageToChat(message);
        if (headers?.get("Message_Status") != 2) {
          fetchAndUpdateAIResponse(messageID, conversationID, false);
        } else {
          setChatStreaming(false);
        }
      }
    } catch (error: any) {
      appendMessageToChat(SimplAi_ERROR_MESSAGE);
      setChatStreaming(false);
      setIsLoading(false);
    }
  };

  const stopStream = async () => {
    if (!streamRef?.current) {
      return null;
    } else {
      console.log("🚀 ~ stopStream ~ stopStream triggered:");
      stopStreamRef.current = true;
      await streamRef?.current?.cancel();
      streamRef.current = undefined;
    }
  };

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    newMessage?: string,
  ) => {
    if (isLoading || chatStreaming || (!message && !newMessage)) return null;
    setIsLoading(true);
    setChatStreaming(true);
    addMessageToChat(newMessage ?? message);
    setMessage("");
    stopStreamRef.current = false;

    try {
      addMessageToChat("", "SimplAi");
      const res = await initiateConversationApi({
        payload: {
          ...chatConfig,
          cust_attr: custAtrr,
          action: conversationId ? "START_SCREEN" : "START_SCREEN",
          query: {
            message: newMessage ?? message,
            message_type: "text",
            message_category: "",
          },
          conversation_id: conversationId,
        },
        headers: {
          [X_SELLER_ID]: data?.user?.details?.id,
          [X_SELLER_PROFILE_ID]: data?.user?.details?.id,
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
          res?.data?.result?.conversation_id,
        );
      }
    } catch {
      appendMessageToChat(SimplAi_ERROR_MESSAGE);
      setIsLoading(false);
      setChatStreaming(false);
    } finally {
      streamRef.current = undefined;
    }
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
    chatStreaming,
    stopStream,
    chatConfig,
    setChatConfig,
    changeConversation,
    changeConversationLoading,
    custAtrr,
    setCustAtrr,
    resetCustAtrr,
  };
};

export default useChatStream;
