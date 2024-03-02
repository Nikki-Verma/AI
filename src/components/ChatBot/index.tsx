"use client";

import { ChatMessage } from "@/Hooks/useChatStream";
import Chat from "../Chat/Chat";
import ChatInput from "../Chat/ChatInput";
import { Container } from "./style";

type ChatBotProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  changeConversationLoading: boolean;
  handleSubmit: (val: any) => void;
  handleInputChange: (val: any) => void;
  input: string;
  setInput: (val: string) => void;
  stopStream: () => void;
};

const ChatBot = ({
  messages,
  isLoading,
  changeConversationLoading,
  handleSubmit,
  handleInputChange,
  input,
  setInput,
  stopStream,
}: ChatBotProps) => {
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
        stopStream={stopStream}
      />
    </Container>
  );
};

export default ChatBot;
