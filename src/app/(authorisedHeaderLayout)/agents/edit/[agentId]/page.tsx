"use client";

import { updatePipelineApi } from "@/api/workflow";
import WorkflowInfo from "@/components/ChatbotInfo";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import CurrentStepIcon from "@/components/Icons/CurrentStepIcon";
import FinishedIcon from "@/components/Icons/FinishedIcon";
import UnvisitedStepIcon from "@/components/Icons/UnvisitedStep";
import KnowledgebaseInfo from "@/components/KnowledgebaseInfo";
import TestPlayground from "@/components/TestPlayground";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { Button, Col, Result, Row, Space, Steps, StepsProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { AgentStatus, AgentStatusType } from "../../constants";
import { AgentEditContainer } from "./style";
import { updateAgentApi } from "@/api/agents";

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
  const [filters, setFilters] = useState(initialFilters());
  const [current, setCurrent] = useState(-1);
  const { data, isError, error, isLoading, refetch } = useFetchData(
    `${config.agents.details}/${agentId}`,
    filters,
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      if (data?.result?.agent_state === AgentStatus.COMPLETED) {
        router.push(`/agents/view/${agentId}`);
      }
      //   CREATED,
      // MODEL_ADDED,
      // KB_ADDED,
      // KB_SKIPPED,
      // TOOL_ADDED,
      // TOOL_SKIPED,
      // COMPLETED
      const currentStep =
        data?.result?.agent_state === AgentStatus.CREATED
          ? 1
          : data?.result?.agent_state === AgentStatus.MODEL_ADDED
            ? 2
            : data?.result?.agent_state === AgentStatus.KB_ADDED ||
                data?.result?.agent_state === AgentStatus.KB_SKIPPED
              ? 3
              : -1;

      if (currentStep === -1) {
        router.push(`/agents`);
      } else if (currentStep != current) {
        setCurrent(currentStep);
      }
    }
  }, [data, isError, isLoading]);

  const items: StepsProps["items"] = [
    {
      title: "Agent Info",
      icon: <FinishedIcon />,
    },
    {
      title: "Select Model",
      icon:
        current === 1 ? (
          <CurrentStepIcon />
        ) : current > 1 ? (
          <FinishedIcon />
        ) : undefined,
    },
    {
      title: "Knowledge Base",
      icon:
        current === 2 ? (
          <CurrentStepIcon />
        ) : current > 2 ? (
          <FinishedIcon />
        ) : current < 2 ? (
          <UnvisitedStepIcon />
        ) : undefined,
    },
    {
      title: "Text & Launch",
      icon:
        current === 3 ? (
          <CurrentStepIcon />
        ) : current > 3 ? (
          <FinishedIcon />
        ) : current < 3 ? (
          <UnvisitedStepIcon />
        ) : undefined,
    },
  ];

  useLayoutEffect(() => {
    updateHeaderTitle("Edit Agent");
  }, []);

  const updateAgent = async (values: any, type: AgentStatusType) => {
    try {
      setFormSubmitting(true);

      const payload = {
        ...(data?.result || {}),
        ...values,
        agent_state: type,
        pipeline_id: agentId,
      };

      const updateAgentResponse = await updateAgentApi({ payload });

      if (updateAgentResponse?.status === 200) {
        refetch();
      }
      if (type === AgentStatus.COMPLETED) {
        notification.success({
          message: "Agent successfully created",
          description: "Now you can proceed with integration with several apps",
        });
        router.push(`/agents/view/${agentId}`);
      }
    } catch (error) {
      notification.error({
        message: "Error while updating agent",
        description: getErrorFromApi(error),
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  const getCurrentStep = () => {
    switch (current) {
      case 1:
        return (
          <WorkflowInfo
            details={data}
            form={form}
            onFininsh={(values) =>
              updateAgent(values, AgentStatus.MODEL_ADDED)
            }
          />
        );
      case 2:
        return (
          <KnowledgebaseInfo
            details={data}
            form={form}
            onFininsh={(values: any) =>
              updateAgent(
                { ...values, is_kb_attached: true },
                AgentStatus.KB_ADDED,
              )
            }
          />
        );
      case 3:
        return null;

      default:
        return <FullScreenLoader />;
    }
  };

  const getActionButtons = () => {
    switch (current) {
      case 1:
        return (
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={form.submit}
                loading={formSubmitting}
              >
                Next
              </Button>
            </Col>
          </Row>
        );

      case 2:
        return (
          <Row justify="end">
            <Col>
              <Space>
                <Button
                  type="default"
                  onClick={() =>
                    updateAgent(
                      { is_kb_attached: false },
                      AgentStatus.KB_SKIPPED,
                    )
                  }
                  disabled={formSubmitting}
                >
                  Skip knowledge base
                </Button>
                <Button
                  type="primary"
                  onClick={form.submit}
                  loading={formSubmitting}
                >
                  Next
                </Button>
              </Space>
            </Col>
          </Row>
        );
      case 3:
        return null;
      default:
        return null;
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
      <Steps items={items} current={current} />
      {getCurrentStep()}
      {getActionButtons()}
    </AgentEditContainer>
  );
};

export default AgentEdit;
