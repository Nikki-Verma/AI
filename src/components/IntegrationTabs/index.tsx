import { useState } from "react";
import IntegrationAgentsList from "../IntegrationAgentsList";
import IntegrationModelsList from "../IntegrationModelsList";
import IntegrationWorkflowsList from "../IntegrationWorkflowsList";
import { MediumRadioGroup } from "../UIComponents/UIComponents.style";
import { IntegrationTabsContainer, RadioButton } from "./style";

enum IntegrationTabType {
  "MODELS" = "MODELS",
  "WORKFLOWS" = "WORKFLOWS",
  "AGENTS" = "AGENTS",
}

const IntegrationTab = {
  MODELS: IntegrationTabType.MODELS,
  WORKFLOWS: IntegrationTabType.WORKFLOWS,
  AGENTS: IntegrationTabType.AGENTS,
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
        return <IntegrationAgentsList />;

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
        <RadioButton value={IntegrationTab.MODELS}>Models</RadioButton>
        <RadioButton value={IntegrationTab.WORKFLOWS}>Workflows</RadioButton>
        <RadioButton value={IntegrationTab.AGENTS}>Agents</RadioButton>
      </MediumRadioGroup>
      {getCurrentTabDetails()}
    </IntegrationTabsContainer>
  );
};

export default IntegrationTabs;
