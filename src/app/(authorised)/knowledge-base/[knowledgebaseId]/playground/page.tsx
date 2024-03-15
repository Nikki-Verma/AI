"use client";

import KbPlaygroundDetails from "@/components/KbPlaygroundDetails";
import uiStyles from "@/components/UIComponents/ui.module.scss";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Result, Row } from "antd";
import { useParams, useRouter } from "next/navigation";

const KbPlayground = () => {
  const { knowledgebaseId } = useParams();
  const router = useRouter();
  const {
    data: knowledgebaseConfig,
    isLoading: knowledgebaseLoading,
    isError: knowledgebaseHasError,
    error: knowledgebaseErrorDetail,
    refetch: refetchDataset,
  } = useFetchData(
    config.knowledgebase.list,
    { knowledgeBaseId: knowledgebaseId },
    {},
  );

  if (knowledgebaseHasError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(knowledgebaseErrorDetail)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }
  return (
    <PageContainer>
      <Col span={24}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <KbPlaygroundDetails knowledgebaseId={knowledgebaseId} />
    </PageContainer>
  );
};

export default KbPlayground;
