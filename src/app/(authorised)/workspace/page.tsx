"use client";

import CardModel from "@/components/CardModel";
import PageHeading from "@/components/PageHeading";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
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
import Link from "next/link";
import { useEffect } from "react";
import { RadioButton } from "./style";

const { Title } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const Workspace = () => {
  const { userConfig, updatePageConfig } = useAppStore();

  const { data: session }: any = useSession();

  const [filters, setFilters] = usePersistedQueryParams(
    initialFilters({ modelStatus: "" }),
  );

  const { data, isLoading, isError, error } = useFetchData(
    config.workspace.models,
    { ...filters },
    {},
  );

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
    <PageContainer>
      <PageHeading
        title="Workspace"
        subHeading="Explore a vast array of meticulously trained and readily deployable
          machine learning models all conveniently centralized in a single
          location."
      />
      <Radio.Group
        value={filters?.modelStatus}
        onChange={(val: any) => {
          setFilters(initialFilters({ modelStatus: val?.target?.value }));
        }}
        buttonStyle="solid"
        size="large"
      >
        <RadioButton value="">Added Models</RadioButton>
        {/* <Radio.Button value="TRAINED">Trained Models</Radio.Button> */}
        <RadioButton value="DEPLOYED" style={{ borderLeft: "0px !important" }}>
          Deployed Models
        </RadioButton>
        {/* <Radio.Button value="INACTIVE">Inactive models</Radio.Button> */}
      </Radio.Group>

      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {isLoading &&
          Array.from({ length: +filters?.size }).map((_, i) => (
            <Col
              key={i}
              span={8}
              style={{ display: "flex", flexDirection: "column" }}
            >
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
          (
            model: { name: string; desc: "string"; [key: string]: any },
            index: number,
          ) => {
            return (
              <Col
                key={model?.id}
                span={8}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardModel
                  index={index}
                  key={model?.name}
                  imageUrl={"/assets/Images/dummyModel.png"}
                  modelData={{ ...model, id: model?.model_id }}
                  redirectUrl={`/workspace/${model?.id}/${model?.model_id}`}
                />
              </Col>
            );
          },
        )}
      </Row>
    </PageContainer>
  );
};

export default Workspace;
