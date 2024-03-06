"use client";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
} from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PlaygroundAgentConfiguration from "../PlaygroundAgentConfiguration";
import PlaygroundWorkflowConfiguration from "../PlaygroundWorkflowConfiguration";
import {
  PlaygroundConfigurationOptions,
  PlaygroundConfigurationOptionType,
} from "./constant";

import { PlaygroundConfigurationContainer } from "./style";

type PlaygroundChatConfigurationProps = {
  setSelectedChatConfigId: (chatConfigId: string | undefined) => void;
  selectedChatConfigId: string | undefined;
  selectedTab: PlaygroundConfigurationOptionType;
  setSelectedTab: (value: PlaygroundConfigurationOptionType) => void;
  selectedChatConfigDetails: UnknownObject | undefined;
  setSelectedChatConfigDetails: (
    chatConfigDetails: UnknownObject | undefined,
  ) => void;
};

const initialFilters = (dynamicState: any = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const PlaygroundChatConfiguration = ({
  selectedChatConfigId,
  setSelectedChatConfigId,
  selectedChatConfigDetails,
  setSelectedChatConfigDetails,
  selectedTab,
  setSelectedTab,
}: PlaygroundChatConfigurationProps) => {
  const { data: session, status }: any = useSession();

  const [filters, setFilters] = useState({ ...initialFilters() });
  const [prompt, setPrompt] = useState("");

  const { data, error, isLoading, isError } = useFetchData(
    config.intract.chatHistoryList,
    { ...filters, userId: session?.user?.details?.id },
    {
      [X_SELLER_ID]: session?.user?.details?.id,
      [X_SELLER_PROFILE_ID]: session?.user?.details?.id,
    },
  );

  const getSelectedTabChildren = () => {
    switch (selectedTab) {
      case PlaygroundConfigurationOptionType.WORKFLOW:
        return (
          <PlaygroundWorkflowConfiguration
            selectedChatConfigId={selectedChatConfigId}
            setSelectedChatConfigId={setSelectedChatConfigId}
            selectedChatConfigDetails={selectedChatConfigDetails}
            setSelectedChatConfigDetails={setSelectedChatConfigDetails}
          />
        );
      case PlaygroundConfigurationOptionType.AGENT:
        return (
          <PlaygroundAgentConfiguration
            selectedChatConfigId={selectedChatConfigId}
            setSelectedChatConfigId={setSelectedChatConfigId}
            selectedChatConfigDetails={selectedChatConfigDetails}
            setSelectedChatConfigDetails={setSelectedChatConfigDetails}
          />
        );
      default:
        return (
          <PlaygroundWorkflowConfiguration
            selectedChatConfigId={selectedChatConfigId}
            setSelectedChatConfigId={setSelectedChatConfigId}
            selectedChatConfigDetails={selectedChatConfigDetails}
            setSelectedChatConfigDetails={setSelectedChatConfigDetails}
          />
        );
    }
  };

  return (
    <PlaygroundConfigurationContainer
      tabList={PlaygroundConfigurationOptions}
      activeTabKey={selectedTab}
      onTabChange={(key: any) => setSelectedTab(key)}
    >
      {getSelectedTabChildren()}
    </PlaygroundConfigurationContainer>
  );
};

export default PlaygroundChatConfiguration;
