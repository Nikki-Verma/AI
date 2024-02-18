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
  loading: boolean;
};

const TestPlayground = ({
  loading,
  details,
  form,
  onFininsh,
}: TestPlaygroundProps) => {
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
    custAtrr,
    setCustAtrr,
  } = useChatStream({
    chatConfig: {
      model: details?.result?.pipeline_name,
      language_code: "EN",
      source: "APP",
      app_id: details?.result?.pipeline_id,
      model_id: details?.result?.pipeline_id,
    },
    convId: conversationId,
    customAttributes: details?.result,
  });

  useEffect(() => {
    changeConversation(conversationId);
  }, [conversationId]);

  const changeConfigHandler = (values: any) => {
    const newCustAtrr = {
      ...custAtrr,
      model_detail: {
        ...(custAtrr?.model_detail || {}),
        model_parameters: values?.model_parameters,
      },
      kb: {
        ...(custAtrr?.kb || {}),
        kb_parameters: values?.kb_parameters,
      },
    };
    setCustAtrr(newCustAtrr);
  };

  const savePlaygroundConfig = (values: any) => {
    onFininsh({ ...custAtrr });
  };

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
    <Spin spinning={configDetailsLoading || loading}>
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
            changeConfigHandler={changeConfigHandler}
            form={form}
            savePlaygroundConfig={savePlaygroundConfig}
          />
        </div>
      </TestPlaygroundContainer>
    </Spin>
  );
};

export default TestPlayground;
