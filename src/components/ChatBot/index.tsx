"use client";

import useChatStream from "@/Hooks/useChatStream";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import ChatInput from "../Chat/ChatInput";
import { Container } from "./style";

type ChatBotProps = {
  propConversationId: string | undefined;
};

const ChatBot = ({ propConversationId }: ChatBotProps) => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stopStream,
    conversationId,
    setConversationId,
    changeConversation,
    changeConversationLoading,
  } = useChatStream({
    chatConfig: {
      model: "abc",
      language_code: "EN",
      source: "APP",
    },
    convId: propConversationId,
  });

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ propConversationId:", propConversationId);
    changeConversation(propConversationId);
  }, [propConversationId]);

  return (
    <Container>
      <Chat
        messages={messages}
        loading={isLoading}
        chatLoading={changeConversationLoading}
      />
      <ChatInput
        submitHandler={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        loading={isLoading}
      />
    </Container>
  );
};

export default ChatBot;
