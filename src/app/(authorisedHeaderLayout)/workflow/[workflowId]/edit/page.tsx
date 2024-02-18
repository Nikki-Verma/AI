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
import { WorkflowStatus, WorkflowStatusType } from "../../constant";
import { WorkflowEditContainer } from "./style";

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  ...dynamicState,
});

const WorkflowEdit = () => {
  const router = useRouter();
  const [form] = useForm();
  const { notification } = useNotify();
  const { updateHeaderTitle } = useAppStore();
  const { workflowId } = useParams();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [filters, setFilters] = useState(initialFilters());
  const [current, setCurrent] = useState(-1);
  const { data, isError, error, isLoading, refetch } = useFetchData(
    `${config.workflow.details}/${workflowId}`,
    filters,
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      if (data?.result?.pipeline_state === WorkflowStatus.COMPLETED) {
        router.push(`/workflow/${workflowId}`);
      }
      //   CREATED,
      // MODEL_ADDED,
      // KB_ADDED,
      // KB_SKIPPED,
      // TOOL_ADDED,
      // TOOL_SKIPED,
      // COMPLETED
      const currentStep =
        data?.result?.pipeline_state === WorkflowStatus.CREATED
          ? 1
          : data?.result?.pipeline_state === WorkflowStatus.MODEL_ADDED
            ? 2
            : data?.result?.pipeline_state === WorkflowStatus.KB_ADDED ||
                data?.result?.pipeline_state === WorkflowStatus.KB_SKIPPED
              ? 3
              : -1;

      if (currentStep === -1) {
        router.push(`/workflow`);
      } else if (currentStep != current) {
        setCurrent(currentStep);
      }
    }
  }, [data, isError, isLoading]);

  const items: StepsProps["items"] = [
    {
      title: "Workflow Info",
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
    updateHeaderTitle("Edit Workflow");
  }, []);

  const updatePipeline = async (values: any, type: WorkflowStatusType) => {
    try {
      setFormSubmitting(true);

      const payload = {
        ...(data?.result || {}),
        ...values,
        pipeline_state: type,
        pipeline_id: workflowId,
      };

      const updatePipelineResponse = await updatePipelineApi({ payload });

      if (updatePipelineResponse?.status === 200) {
        refetch();
      }
      if (type === WorkflowStatus.COMPLETED) {
        notification.success({
          message: "workflow completed successfully",
        });
        router.push(`/workflow`);
      }
    } catch (error) {
      notification.error({
        message: "Error while updating pipeline",
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
              updatePipeline(values, WorkflowStatus.MODEL_ADDED)
            }
          />
        );
      case 2:
        return (
          <KnowledgebaseInfo
            details={data}
            form={form}
            onFininsh={(values: any) =>
              updatePipeline(
                { ...values, is_kb_attached: true },
                WorkflowStatus.KB_ADDED,
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
                    updatePipeline(
                      { is_kb_attached: false },
                      WorkflowStatus.KB_SKIPPED,
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
          updatePipeline({ ...values }, WorkflowStatus.COMPLETED)
        }
      />
    );
  }

  return (
    <WorkflowEditContainer>
      <Steps items={items} current={current} />
      {getCurrentStep()}
      {getActionButtons()}
    </WorkflowEditContainer>
  );
};

export default WorkflowEdit;
