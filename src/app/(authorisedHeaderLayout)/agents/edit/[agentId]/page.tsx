"use client";

import { updateAgentApi } from "@/api/agents";
import ChatBot from "@/components/ChatBot";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import IntegrateModal from "@/components/IntegrateModal";
import PipelineInfo from "@/components/PipelineInfo";
import TestPlayground from "@/components/TestPlayground";
import { useFetchData } from "@/Hooks/useApi";
import useChatStream from "@/Hooks/useChatStream";
import { useNotify } from "@/providers/notificationProvider";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { Button, Col, Result, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { AgentStatus, AgentStatusType } from "../../constants";
import { AgentEditContainer } from "./style";

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  ...dynamicState,
});

const AgentEdit = () => {
  const router = useRouter();
  const [form] = useForm();
  const { notification } = useNotify();
  const { updateHeaderTitle } = useAppStore();
  const { agentId } = useParams();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [agentPublishing, setAgentPublishing] = useState(false);
  const [formValues, setFormValues] = useState();
  const [filters, setFilters] = useState(initialFilters());
  const [current, setCurrent] = useState(-1);
  const [integrateAgentModalOpen, setIntegrateAgentModalOpen] = useState(false);
  const { data, isError, error, isLoading, refetch } = useFetchData(
    `${config.agents.details}/${agentId}`,
    filters,
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: isChatLoading,
    setInput,
    changeConversationLoading,
    setChatConfig,
    stopStream,
    custAtrr,
    setCustAtrr,
  } = useChatStream({
    chatConfig: {
      model: data?.result?.agent_name,
      language_code: "EN",
      source: "APP",
      app_id: data?.result?.pipeline_id,
      model_id: data?.result?.pipeline_id,
    },
  });

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    setChatConfig({
      model: data?.result?.agent_name,
      language_code: "EN",
      source: "APP",
      app_id: data?.result?.pipeline_id,
      model_id: data?.result?.pipeline_id,
    });
  }, [data]);

  useEffect(() => {
    if (!isError && !isLoading) {
      //   CREATED,
      // MODEL_ADDED,
      // KB_ADDED,
      // KB_SKIPPED,
      // TOOL_ADDED,
      // TOOL_SKIPED,
      // COMPLETED
      const currentStep =
        data?.result?.agent_state === AgentStatus.CREATED ||
        data?.result?.agent_state === AgentStatus.MODEL_ADDED ||
        data?.result?.agent_state === AgentStatus.COMPLETED
          ? 1
          : -1;

      if (currentStep === -1) {
        router.push(`/agents`);
      } else if (currentStep != current) {
        setCurrent(currentStep);
      }
    }
  }, [data, isError, isLoading]);

  useLayoutEffect(() => {
    updateHeaderTitle("Edit Agent");
  }, []);

  const updateAgent = async (values: any, type: AgentStatusType) => {
    try {
      if (type === AgentStatus.COMPLETED) {
        setAgentPublishing(true);
      } else {
        setFormSubmitting(true);
      }

      const payload = {
        ...(data?.result || {}),
        ...values,
        kb: values?.kb?.kb_name ? values?.kb : null,
        // tools : ['65df05b1f402ca4e373f940d'],
        agent_state: type,
        pipeline_id: agentId,
      };

      const updateAgentResponse = await updateAgentApi({ payload });

      if (updateAgentResponse?.status === 200) {
        refetch();
      }
      if (type === AgentStatus.COMPLETED) {
        notification.success({
          message: "Agent successfully Published",
          description: "Now you can proceed with integration with several apps",
        });
        setIntegrateAgentModalOpen(true);
        // router.push(`/agents/view/${agentId}`);
      }
    } catch (error) {
      notification.error({
        message: "Error while updating agent",
        description: getErrorFromApi(error),
      });
    } finally {
      setFormSubmitting(false);
      setAgentPublishing(false);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    <Row justify="center">
      <Col>
        <Result
          status="500"
          title={getErrorFromApi(error)}
          subTitle="Please refresh or comeback in sometime"
        />
      </Col>
    </Row>;
  }
  if (current == 3) {
    return (
      <TestPlayground
        details={data}
        form={form}
        loading={formSubmitting}
        onFininsh={(values: any) =>
          updateAgent({ ...values }, AgentStatus.COMPLETED)
        }
      />
    );
  }

  return (
    <AgentEditContainer>
      <Row gutter={[16, 20]}>
        <Col span={12}>
          <PipelineInfo
            details={data}
            form={form}
            formSubmitting={formSubmitting}
            onFininsh={(values) => updateAgent(values, AgentStatus.MODEL_ADDED)}
            setCustAtrr={setCustAtrr}
            isChatLoading={isChatLoading}
            setFormValues={setFormValues}
            agentId={agentId}
            refetch={refetch}
          />
        </Col>
        <Col span={12}>
          {custAtrr?.model_detail?.model_name ? (
            <div>
              <Row
                justify="end"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      updateAgent(formValues, AgentStatus.COMPLETED);
                    }}
                    loading={agentPublishing}
                    disabled={isChatLoading}
                  >
                    Save and publish
                  </Button>
                </Col>
              </Row>

              <div style={{ overflowY: "auto", height: "calc(100vh - 155px)" }}>
                <ChatBot
                  messages={messages}
                  changeConversationLoading={changeConversationLoading}
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                  input={input}
                  setInput={setInput}
                  isLoading={isChatLoading}
                  stopStream={stopStream}
                  WelcomeMessage="Welcome to the Playground! Here, you can experiment with your agent, tweaking parameters and observing the outcomes in real-time. Dive in to fine-tune your AI's performance and discover the best configurations for your applications."
                />
              </div>
            </div>
          ) : (
            <>Please select a model to start testing</>
          )}
        </Col>
      </Row>
      <IntegrateModal
        open={integrateAgentModalOpen}
        setIsOpen={setIntegrateAgentModalOpen}
        details={data}
      />
    </AgentEditContainer>
  );
};

export default AgentEdit;
