"use client";

import DatasetDetails from "@/components/Dataset/DatasetDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useRouter } from "next/navigation";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { DatasetDetailsContainer } from "./style";

const DatasetDetailsPage = ({ params }: any) => {
  const router = useRouter();

  return (
    <DatasetDetailsContainer>
      <Col span={24}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <DatasetDetails />
    </DatasetDetailsContainer>
  );
};

export default DatasetDetailsPage;
