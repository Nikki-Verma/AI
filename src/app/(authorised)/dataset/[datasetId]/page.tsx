"use client";

import DatasetDetails from "@/components/Dataset/DatasetDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { DatasetDetailsContainer } from "./style";

const DatasetDetailsPage = ({ params }: any) => {
  return (
    <DatasetDetailsContainer>
      <Col span={24}>
        <Link prefetch href={"/dataset"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <DatasetDetails />
    </DatasetDetailsContainer>
  );
};

export default DatasetDetailsPage;
