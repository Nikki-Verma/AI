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
import { useLayoutEffect } from "react";
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
    setInput,
    changeConversationLoading,
  } = useChatStream({
    chatConfig: {
      model: workflowData?.result?.pipeline_name,
      language_code: "EN",
      source: "APP",
      app_id: workflowData?.result?.pipeline_id,
      model_id: workflowData?.result?.pipeline_id,
    },
  });

  useLayoutEffect(() => {
    updateHeaderTitle(
      workflowData?.result?.pipeline_name
        ? `Workflow Playground - ${workflowData?.result?.pipeline_name}`
        : `Workflow Playground - ${workflowId}`,
    );
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
        isLoading={isLoading}
      />
    </WorkflowPlaygroundContainer>
  );
};

export default WorkflowPlayground;
