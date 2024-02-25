"use client";

import CardModel from "@/components/CardModel";
import PageHeading from "@/components/PageHeading";
import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Input,
  Pagination,
  PaginationProps,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { Heading, ModelContainer } from "./style";

const { Title } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  type: "OPEN",
  ...dynamicState,
});

const ModalityOptions = [
  {
    label: "Text",
    value: "Text",
  },
  {
    label: "Image",
    value: "Image",
  },
  {
    label: "Video",
    value: "Video",
  },
  {
    label: "Audio",
    value: "Audio",
  },
];
const FunctionFilterOptions = [
  {
    label: "Text to Text",
    value: "Text-to-Text",
  },
  {
    label: "Audio to Text",
    value: "Audio-to-Text",
  },
  {
    label: "Image to Text",
    value: "Image-to-Text",
  },
  {
    label: "Video to Text",
    value: "Video-to-Text",
  },
];

const ArchitectureFilterOptions = [
  {
    label: "Transformer",
    value: "Transformer",
  },
  {
    label: "Diffusion",
    value: "Diffusion",
  },
  {
    label: "LSTM",
    value: "LSTM",
  },
  {
    label: "RNN",
    value: "RNN",
  },
  {
    label: "CNN",
    value: "CNN",
  },
  {
    label: "GAN",
    value: "GAN",
  },
];

const Models = () => {
  const { updatePageConfig } = useAppStore();
  const { data: session }: any = useSession();
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());

  const [searchValue, setSearchValue] = useState<string>("");
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

  useLayoutEffect(() => {
    if (filters?.name != searchValue) {
      setSearchValue(filters?.name);
    }
  }, [filters]);

  const pageChangeHandler: PaginationProps["onChange"] = (
    pageNumber,
    pageSize,
  ) => {
    setFilters((prev: any) => ({ ...prev, page: pageNumber, size: pageSize }));
  };

  const updateFilters = (updateState: { [key: string]: any } = {}) =>
    setFilters((prev: any) => ({
      ...prev,
      ...updateState,
      page: DEFAULT_PAGE,
    }));

  return (
    <ModelContainer>
      <Row
        gutter={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Col span={14}>
          <PageHeading
            title="Models"
            subHeading="Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location."
          />
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
          <Col span={24}>
            <Radio.Group
              value={filters?.type}
              onChange={(event: any) => {
                setFilters(initialFilters({ type: event?.target?.value }));
                setSearchValue("");
              }}
              size="large"
              buttonStyle="solid"
            >
              <Radio.Button value="OPEN">Open Source</Radio.Button>
              <Radio.Button value="CLOSED">Closed Source</Radio.Button>
            </Radio.Group>
          </Col>
        </Col>
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
            onPressEnter={(e: any) => {
              updateFilters({ name: e?.target?.value });
            }}
            allowClear={{
              clearIcon: (
                <CloseOutlined onClick={() => updateFilters({ name: "" })} />
              ),
            }}
            onChange={(e: any) => {
              setSearchValue(e.target.value);
              if (!e.target.value) {
                updateFilters({ name: "" });
              }
            }}
            value={searchValue}
          />
        </Col>
        <Col>
          <Select
            showSearch
            optionFilterProp="label"
            options={ModalityOptions}
            onChange={(value: string) => {
              updateFilters({ modality: value });
            }}
            value={filters?.modality}
            placeholder="Modality"
            allowClear
          />
        </Col>
        <Col>
          <Select
            showSearch
            optionFilterProp="label"
            options={FunctionFilterOptions}
            onChange={(value: string) => {
              updateFilters({ function: value });
            }}
            value={filters?.function}
            placeholder="Function"
            allowClear
          />
        </Col>
        <Col>
          <Select
            showSearch
            optionFilterProp="label"
            options={ArchitectureFilterOptions}
            onChange={(value: string) => {
              updateFilters({ architecture: value });
            }}
            value={filters?.architecture}
            placeholder="Architecture"
            allowClear
          />
        </Col>
      </Row>
      <Col span={24}>
        <Heading>Trending Models</Heading>
      </Col>
      <Row gutter={[28, 16]} style={{ display: "flex", margin: "16px 0px" }}>
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
                  modelData={model}
                  redirectUrl={`/models/${model?.id}`}
                />
              </Col>
            );
          },
        )}
      </Row>

      <Row justify="end">
        <Col>
          <Pagination
            pageSize={+filters?.size}
            current={+filters?.page - 1}
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
