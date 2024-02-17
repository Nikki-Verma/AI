import useChatStream from "@/Hooks/useChatStream";
import { UnknownObject } from "@/utils/types";
import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import ChatBot from "../ChatBot";
import PlaygroundConfig from "../PlaygroundConfig";
import { TestPlaygroundContainer } from "./style";

type TestPlaygroundProps = {
  details: UnknownObject | undefined | null;
  form: FormInstance;
  onFininsh: (values: any) => void;
};

const TestPlayground = ({ details, form, onFininsh }: TestPlaygroundProps) => {
  console.log("🚀 ~ TestPlayground ~ details:", details);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    changeConversation,
    changeConversationLoading,
  } = useChatStream({
    chatConfig: {
      model: "abc",
      language_code: "EN",
      source: "APP",
    },
    convId: conversationId,
  });

  useEffect(() => {
    changeConversation(conversationId);
  }, [conversationId]);
  return (
    <TestPlaygroundContainer>
      <div style={{ height: "100%", flex: 1, padding: "20px" }}>
        <ChatBot
          messages={messages}
          changeConversationLoading={changeConversationLoading}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
        />
      </div>
      <div style={{ height: "100%", width: "25%" }}>
        <PlaygroundConfig />
      </div>
    </TestPlaygroundContainer>
  );
};

export default TestPlayground;
