import { Radio } from "antd";
import { useState } from "react";
import { IntegrationTabsContainer } from "./style";

enum IntegrationTabType {
  "MODELS" = "MODELS",
  "WORKFLOWS" = "WORKFLOWS",
}

const IntegrationTab = {
  MODELS: IntegrationTabType.MODELS,
  WORKFLOWS: IntegrationTabType.WORKFLOWS,
};

const IntegrationTabs = () => {
  const [integrationTab, setIntegrationTab] = useState<IntegrationTabType>(
    IntegrationTab.MODELS,
  );

  const getCurrentTabDetails = () => {
    switch (integrationTab) {
      case IntegrationTab.MODELS:
        return <div> models</div>;

      case IntegrationTab.WORKFLOWS:
        return <div> workflows</div>;

      default:
        return <div> models</div>;
    }
  };

  return (
    <IntegrationTabsContainer>
      <Radio.Group
        size="large"
        value={integrationTab}
        onChange={(val: any) => {
          setIntegrationTab(val?.target?.value);
        }}
        buttonStyle="solid"
      >
        <Radio.Button value={IntegrationTab.MODELS}>Models</Radio.Button>
        <Radio.Button value={IntegrationTab.WORKFLOWS}>Workflows</Radio.Button>
      </Radio.Group>
      {getCurrentTabDetails()}
    </IntegrationTabsContainer>
  );
};

export default IntegrationTabs;
