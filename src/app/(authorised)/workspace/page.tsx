"use client";

import CardModel from "@/components/CardModel";
import { useFetchData } from "@/Hooks/useApi";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import {
  Button,
  Card,
  Col,
  PaginationProps,
  Radio,
  Result,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubHeading, WorkspaceContainer } from "./style";

const { Title } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const Workspace = () => {
  const { userConfig, updatePageConfig } = useAppStore();
  const [modelStatus, setModelStatus] = useState("ADDED");

  const { data: session }: any = useSession();

  const [filters, setFilters] = useState(initialFilters({ modelStatus }));
  const { data, isLoading, isError, error } = useFetchData(
    config.workspace.models,
    { ...filters },
    {},
  );

  useEffect(() => {
    setFilters(initialFilters({ modelStatus }));
  }, [modelStatus]);

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Workspace",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  const pageChangeHandler: PaginationProps["onChange"] = (
    pageNumber,
    pageSize,
  ) => {
    setFilters((prev: any) => ({ ...prev, page: pageNumber, size: pageSize }));
  };

  return (
    <WorkspaceContainer>
      <Row
        gutter={12}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Workspace</Title>
          <SubHeading>
            Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location.
          </SubHeading>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Image
            src={"/assets/Images/modelHeaderImage.svg"}
            alt="workspace"
            width={140}
            height={96}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Radio.Group
          value={modelStatus}
          onChange={(val: any) => {
            setModelStatus(val?.target?.value);
          }}
          buttonStyle="solid"
        >
          <Radio.Button value="ADDED">Added Models</Radio.Button>
          <Radio.Button value="TRAINED">Trained Models</Radio.Button>
          <Radio.Button value="DEPLOYED">Deployed Models</Radio.Button>
          <Radio.Button value="INACTIVE">Inactive models</Radio.Button>
        </Radio.Group>
      </Col>

      <Row gutter={[28, 16]} style={{ display: "flex", margin: "24px 0px" }}>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
              <Card key={i}>
                <Skeleton loading active avatar round></Skeleton>
              </Card>
            </Col>
          ))}
        {!(data?.result?.length > 0) && !isLoading && (
          <Col span={24}>
            <Result
              status={404}
              extra={
                <Link prefetch href={"/models"}>
                  <Button type="primary">Add models to workspace</Button>
                </Link>
              }
              title="You do not have any models in your workspace yet"
              subTitle="Please add some models to start interacting "
            />
          </Col>
        )}
        {(data?.result || [])?.map(
          (model: { name: string; desc: "string"; [key: string]: any }) => {
            return (
              <Col
                span={8}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardModel
                  key={model?.name}
                  imageUrl={"/assets/Images/modelHeaderImage.svg"}
                  modelData={{ ...model, id: model?.model_id }}
                  goToBaseUrl="/workspace"
                />
              </Col>
            );
          },
        )}
      </Row>
    </WorkspaceContainer>
  );
};

export default Workspace;
