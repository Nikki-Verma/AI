import useChatStream from "@/Hooks/useChatStream";
import { UnknownObject } from "@/utils/types";
import { FormInstance, Spin } from "antd";
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
  const [playgroundConfigDetails, setPlaygroundConfigDetails] = useState({
    model_paramters: {},
    kb_parameters: {},
  });
  const [configDetailsLoading, setConfigDetailsLoading] = useState(true);

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

  useEffect(() => {
    const modelParameters =
      details?.result?.model_detail?.model_parameters || {};
    const kbParameters = details?.result?.kb?.kb_paramters || {};

    const newConfigDetails = {
      model_paramters: modelParameters,
      kb_parameters: kbParameters,
    };

    setPlaygroundConfigDetails(newConfigDetails);
    setConfigDetailsLoading(false);
  }, [details]);

  return (
    <Spin spinning={configDetailsLoading}>
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
          <PlaygroundConfig
            playgroundConfigDetails={playgroundConfigDetails}
            canLaunch={true}
            form={form}
          />
        </div>
      </TestPlaygroundContainer>
    </Spin>
  );
};

export default TestPlayground;
