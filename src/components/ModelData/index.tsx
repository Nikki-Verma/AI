import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Skeleton, Tabs, Tag } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ModelOverView from "../ModelOverview";
import uiStyles from "../UIComponents/ui.module.scss";
import { ModelAbout, ModelTitle } from "./style";

const ModelData = (props: any) => {
  const router = useRouter();
  const { modelId } = useParams();
  const { data, isLoading, isError, error } = useFetchData(
    config.models.detail,
    { id: modelId },
    {},
  );

  if (isLoading) {
    return (
      <Card size="default">
        <Skeleton active avatar loading paragraph={{ rows: 12 }} />
      </Card>
    );
  }
  if (isError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(error)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }
  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Col
          span={props?.page === "models" ? 18 : 16}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={"/assets/Images/modelHeaderImage.svg"}
              alt="models"
              height={32}
              width={32}
              style={{
                display: "flex",
                marginRight: "12px",
              }}
            />
            <ModelTitle>{data?.result?.name}</ModelTitle>
            <div className={uiStyles.like_button_container}>
              {true ? (
                <HeartOutlined
                  style={{
                    color: "#5B5B5B",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <HeartFilled
                  style={{
                    color: "red",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              )}

              <div
                style={{
                  color: "var(--Text-Color-850, #222)",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22pxs",
                }}
              >
                Like | 2.61ks
              </div>
            </div>
          </div>
          <ModelAbout>{data?.result?.desc}</ModelAbout>
          <Row gutter={[0, 10]}>
            {(data?.result?.tags || [])?.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Row>
        </Col>
        <Col
          span={props?.page === "models" ? 6 : 8}
          style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
        >
          {props?.page === "models" ? (
            <Button type="primary">Add to workspace</Button>
          ) : (
            <>
              <Button>Test</Button>
              <Button
                onClick={() =>
                  router.push("/train-model/TinyLlama-1.1B-Chat-v1.0")
                }
              >
                Train
              </Button>
              <Button type="primary">Deploy</Button>
            </>
          )}
        </Col>
      </Row>
      <Tabs defaultActiveKey="files">
        <TabPane tab="Files and versions" key={"files"}>
          <ModelOverView overviewDetails={data?.result?.detail} />
        </TabPane>
        <TabPane tab="Files and versions" key={"files1"}></TabPane>
        <TabPane tab="Run" key={"files2"}></TabPane>
      </Tabs>
    </div>
  );
};

export default ModelData;
