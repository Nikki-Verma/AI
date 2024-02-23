"use client";

import ChatBot from "@/components/ChatBot";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { useFetchData } from "@/Hooks/useApi";
import useChatStream from "@/Hooks/useChatStream";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { Col, Result, Row } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { ModelPlaygroundContainer } from "./style";

const ModelPlayground = () => {
  const { userModelId, modelId } = useParams();
  const { updateHeaderTitle } = useAppStore();
  const {
    data: modelData,
    isError: modelFetchHasError,
    error: modelFetchError,
    isLoading: modelDataLoading,
    refetch,
  } = useFetchData(config.models.detail, { id: modelId }, {});
  console.log("🚀 ~ ModelPlayground ~ modelData:", modelData);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    changeConversationLoading,
    setChatConfig,
    stopStream,
  } = useChatStream({
    chatConfig: {
      model: modelData?.result?.name,
      language_code: "EN",
      source: "APP",
      app_id: typeof userModelId === "string" ? userModelId : "",
      model_id: typeof userModelId === "string" ? userModelId : "",
    },
  });

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useLayoutEffect(() => {
    updateHeaderTitle(
      modelData?.result?.name
        ? `Model Playground - ${modelData?.result?.name}`
        : `Model Playground - ${userModelId}`,
    );
  }, [modelData]);

  useEffect(() => {
    setChatConfig({
      model: modelData?.result?.name,
      language_code: "EN",
      source: "APP",
      app_id: typeof userModelId === "string" ? userModelId : "",
      model_id: typeof userModelId === "string" ? userModelId : "",
    });
  }, [modelData]);

  if (modelDataLoading) {
    return <FullScreenLoader />;
  }

  if (modelFetchHasError) {
    <Row justify="center">
      <Col>
        <Result
          status="500"
          title={getErrorFromApi(modelFetchError)}
          subTitle="Please refresh or comeback in sometime"
        />
      </Col>
    </Row>;
  }

  return (
    <ModelPlaygroundContainer>
      <ChatBot
        messages={messages}
        changeConversationLoading={changeConversationLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
    </ModelPlaygroundContainer>
  );
};

export default ModelPlayground;
