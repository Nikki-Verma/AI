import { Radio } from "antd";
import { useState } from "react";
import IntegrationModelsList from "../IntegrationModelsList";
import IntegrationWorkflowsList from "../IntegrationWorkflowsList";
import { MediumRadioGroup } from "../UIComponents/UIComponents.style";
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
        return <IntegrationModelsList />;

      case IntegrationTab.WORKFLOWS:
        return <IntegrationWorkflowsList />;

      default:
        return <div> models</div>;
    }
  };

  return (
    <IntegrationTabsContainer>
      <MediumRadioGroup
        value={integrationTab}
        onChange={(val: any) => {
          setIntegrationTab(val?.target?.value);
        }}
        buttonStyle="solid"
      >
        <Radio.Button value={IntegrationTab.MODELS}>Models</Radio.Button>
        <Radio.Button value={IntegrationTab.WORKFLOWS}>Workflows</Radio.Button>
      </MediumRadioGroup>
      {getCurrentTabDetails()}
    </IntegrationTabsContainer>
  );
};

export default IntegrationTabs;
