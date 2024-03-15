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
import { WorkflowPlaygroundContainer } from "./style";

const WorkflowPlayground = () => {
  const { workflowId } = useParams();
  const { updateHeaderTitle } = useAppStore();
  const {
    data: workflowData,
    isError: workflowFetchHasError,
    error: workflowFetchError,
    isLoading: workflowDataLoading,
    refetch,
  } = useFetchData(`${config.workflow.details}/${workflowId}`);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    chatStreaming,
    setInput,
    changeConversationLoading,
    setChatConfig,
    stopStream,
  } = useChatStream({
    chatConfig: {
      model: workflowData?.result?.pipeline_name,
      language_code: "EN",
      source: "APP",
      app_id: workflowData?.result?.pipeline_id,
      model_id: workflowData?.result?.pipeline_id,
    },
  });

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useLayoutEffect(() => {
    updateHeaderTitle(
      workflowData?.result?.pipeline_name
        ? `Workflow Playground - ${workflowData?.result?.pipeline_name}`
        : `Workflow Playground - ${workflowId}`,
    );
  }, [workflowData]);

  useEffect(() => {
    setChatConfig({
      model: workflowData?.result?.pipeline_name,
      language_code: "EN",
      source: "APP",
      app_id: workflowData?.result?.pipeline_id,
      model_id: workflowData?.result?.pipeline_id,
    });
  }, [workflowData]);

  if (workflowDataLoading) {
    return <FullScreenLoader />;
  }

  if (workflowFetchHasError) {
    <Row justify="center">
      <Col>
        <Result
          status="500"
          title={getErrorFromApi(workflowFetchError)}
          subTitle="Please refresh or comeback in sometime"
        />
      </Col>
    </Row>;
  }

  return (
    <WorkflowPlaygroundContainer>
      <ChatBot
        messages={messages}
        changeConversationLoading={changeConversationLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        stopStream={stopStream}
        isLoading={isLoading}
        chatStreaming={chatStreaming}
        WelcomeMessage="Welcome to the Playground! Here, you can experiment with your workflows, tweaking parameters and observing the outcomes in real-time. Dive in to fine-tune your AI's performance and discover the best configurations for your applications."
      />
    </WorkflowPlaygroundContainer>
  );
};

export default WorkflowPlayground;
