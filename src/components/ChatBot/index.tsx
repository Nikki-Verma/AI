"use client";

import { ChatMessage } from "@/Hooks/useChatStream";
import Chat from "../Chat/Chat";
import ChatInput from "../Chat/ChatInput";
import { Container } from "./style";

type ChatBotProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  chatStreaming: boolean;
  changeConversationLoading: boolean;
  handleSubmit: (val: any) => void;
  handleInputChange: (val: any) => void;
  input: string;
  setInput: (val: string) => void;
  stopStream: () => void;
  WelcomeMessage: string;
};

const ChatBot = ({
  messages,
  isLoading,
  chatStreaming,
  changeConversationLoading,
  handleSubmit,
  handleInputChange,
  input,
  setInput,
  stopStream,
  WelcomeMessage,
}: ChatBotProps) => {
  return (
    <Container>
      <Chat
        messages={messages}
        loading={isLoading}
        chatStreaming={chatStreaming}
        chatLoading={changeConversationLoading}
        WelcomeMessage={WelcomeMessage}
      />
      <ChatInput
        submitHandler={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        loading={isLoading || chatStreaming}
        stopStream={stopStream}
      />
    </Container>
  );
};

export default ChatBot;
