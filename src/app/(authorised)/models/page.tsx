"use client";

import { addModelToWorkspaceApi } from "@/api/workspace";
import CardModel from "@/components/CardModel";
import { useFetchData } from "@/Hooks/useApi";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_TENANT_ID,
  X_TENANT_ID,
  X_USER_ID,
} from "@/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heading, ModelContainer, SubHeading } from "./style";

const { Title } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const Models = () => {
  const { updatePageConfig } = useAppStore();
  const { data: session }: any = useSession();
  const [filters, setFilters] = useState(initialFilters());
  const { data, isLoading, isError, error } = useFetchData(
    config.models.list,
    { ...filters },
    {},
  );

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Models",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  const addToworkspace = async (model: any) => {
    const payload = {
      tenant_id: DUMMY_TENANT_ID,
      user_id: session?.user?.details?.id,
      username: session?.user?.details?.name,
      model_id: model?.id,
      model_name: model?.name,
      model_params: {
        ...model,
      },
    };

    const headers = {
      [X_TENANT_ID]: DUMMY_TENANT_ID,
      [X_USER_ID]: session?.user?.details?.id,
    };

    const modelResponse = await addModelToWorkspaceApi({ payload, headers });
  };

  const pageChangeHandler: PaginationProps["onChange"] = (
    pageNumber,
    pageSize,
  ) => {
    setFilters((prev: any) => ({ ...prev, page: pageNumber, size: pageSize }));
  };

  return (
    <ModelContainer>
      <Row
        gutter={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Models</Title>
          <SubHeading>
            Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location.
          </SubHeading>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Image
            src={"/assets/Images/modelHeaderImage.svg"}
            width={140}
            height={96}
            alt="models"
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ display: "flex", margin: "30px 0px" }}>
        <Col span={24}>
          <Input
            prefix={
              <SearchOutlined
                style={{
                  color: "#727272",
                  fontSize: "20px",
                  margin: "0px 12px",
                }}
              />
            }
            placeholder="Search models"
          />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
        <Col>
          <Select placeholder="Model size" />
        </Col>
        <Col>
          <Select placeholder="Dataset type" />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
        <Col>
          <Select placeholder="Dataset type" />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
      </Row>
      <Col span={24}>
        <Heading>Trending Models</Heading>
      </Col>
      <Row gutter={[28, 16]} style={{ display: "flex", margin: "16px 0px" }}>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
              <Card key={i}>
                <Skeleton loading active avatar round></Skeleton>
              </Card>
            </Col>
          ))}
        {(data?.result || [])?.map(
          (model: { name: string; desc: "string"; [key: string]: any }) => {
            return (
              <Col
                span={8}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardModel
                  addToworkspace={addToworkspace}
                  key={model?.name}
                  imageUrl={"/assets/Images/modelHeaderImage.svg"}
                  modelData={model}
                  goToBaseUrl="/models"
                />
              </Col>
            );
          },
        )}
      </Row>

      <Row justify="end">
        <Col>
          <Pagination
            pageSize={filters?.size}
            current={filters?.page - 1}
            total={data?.totalElements}
            showSizeChanger={false}
            hideOnSinglePage
            responsive
            onChange={pageChangeHandler}
          />
        </Col>
      </Row>
    </ModelContainer>
  );
};

export default Models;
