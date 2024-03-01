"use client";

import DatasetList from "@/components/Dataset/DatasetList";
import PageHeading from "@/components/PageHeading";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useAppStore } from "@/store";
import { Typography } from "antd";
import { useEffect } from "react";

const { Title } = Typography;

const datset = () => {
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Datasets",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, [updatePageConfig]);

  return (
    <PageContainer>
      <PageHeading
        title="Datasets"
        subHeading="Explore, analyze, and share quality data. you can select your data
            collection while training your ai model, multi data collection can
            be added in one AI model."
      />
      <DatasetList />
    </PageContainer>
  );
};

export default datset;
