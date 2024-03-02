import { Radio } from "antd";
import { useState } from "react";
import IntegrationModelsList from "../IntegrationModelsList";
import IntegrationWorkflowsList from "../IntegrationWorkflowsList";
import { MediumRadioGroup } from "../UIComponents/UIComponents.style";
import { IntegrationTabsContainer } from "./style";
import IntegrationAgentsList from "../IntegrationAgentsList";

enum IntegrationTabType {
  "MODELS" = "MODELS",
  "WORKFLOWS" = "WORKFLOWS",
  'AGENTS' = "AGENTS"
}

const IntegrationTab = {
  MODELS: IntegrationTabType.MODELS,
  WORKFLOWS: IntegrationTabType.WORKFLOWS,
  AGENTS : IntegrationTabType.AGENTS
};

const IntegrationTabs = () => {
  const [integrationTab, setIntegrationTab] = useState(IntegrationTab.MODELS);

  const getCurrentTabDetails = () => {
    switch (integrationTab) {
      case IntegrationTab.MODELS:
        return <IntegrationModelsList />;

      case IntegrationTab.WORKFLOWS:
        return <IntegrationWorkflowsList />;
      
      case IntegrationTab.AGENTS:
        return <IntegrationAgentsList />

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
        <Radio.Button value={IntegrationTab.AGENTS}>Agents</Radio.Button>
      </MediumRadioGroup>
      {getCurrentTabDetails()}
    </IntegrationTabsContainer>
  );
};

export default IntegrationTabs;
