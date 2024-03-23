"use client";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ALL_DATA_PAGE_SIZE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, List, Select } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaygroundAgentConfiguration from "../PlaygroundAgentConfiguration";
import PlaygroundWorkflowConfiguration from "../PlaygroundWorkflowConfiguration";
import config from "@/utils/apiEndoints";

import {
  PlaygroundConfigurationOptions,
  PlaygroundConfigurationOptionType,
} from "./constant";

import {
  PlaygroundConfigurationContainer,
  SelectedModalHeading,
  SelectedModal,
  ModalSelectContainer,
  PlaygroundTypeListContainer,
  PlaygroundTypeListHeading,
  SubMenuContainer
} from "./style";
import SelectCarotIcon from "../Icons/SelectCarotIcon";
import SelectPayGroundIcon from "../Icons/SelectPayGroundIcon";
import { useFetchData } from "@/Hooks/useApi";

type PlaygroundChatConfigurationProps = {
  setSelectedChatConfigId: (chatConfigId: string | undefined) => void;
  selectedChatConfigId: string | undefined;
  selectedTab: any;
  setSelectedTab: any;
  selectedChatConfigDetails: UnknownObject | undefined;
  setSelectedChatConfigDetails: (
    chatConfigDetails: UnknownObject | undefined,
  ) => void;
  changeConversation: (val: string | undefined) => void;
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
  changeConversation,
}: PlaygroundChatConfigurationProps) => {
  const { data: session, status }: any = useSession();

  const [filters, setFilters] = useState({ ...initialFilters() });
  const [prompt, setPrompt] = useState("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isNewAgentConfig, setIsNewAgentConfig] = useState<boolean>(false);



  const getSelectedTabChildren = (selectedTab:string) => {
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
  
  const handleClick = (key: string) => {
    setSelectedTab(key);
  };

  const PlayGroundModals = [
    {
      value: "WorkFlow",
      key: "WORKFLOW",
    },
    {
      value: "Agent",
      key: "AGENT",
    },
  ];

  const { data, isLoading, isError, error, refetch } = useFetchData(
    session?.user?.permissions?.includes?.("ALL_LIST_VIEW")
      ? config.workflow.listAll
      : config.workflow.list,
    { page: DEFAULT_PAGE, size: ALL_DATA_PAGE_SIZE },
    {},
  );

  useEffect(() => {
    if (data) {
      const newSelectedWorkflow = data?.result?.[0] ?? undefined;
      if (newSelectedWorkflow) {
        setSelectedChatConfigDetails(newSelectedWorkflow);
        setSelectedChatConfigId(newSelectedWorkflow?.pipeline_id);
      }
    }
  }, [data]);

  let selectedHeading;
  let modalName;
  if(
    selectedTab === "WORKFLOW" && 
    (selectedChatConfigDetails?.pipeline_name || selectedChatConfigDetails?.pipeline_id)
  ){
    selectedHeading = selectedTab
    modalName = selectedChatConfigDetails?.pipeline_name;
  }else if(selectedTab === "AGENT" && 
  (selectedChatConfigDetails?.agent_name || selectedChatConfigDetails?.agent_id)){
    selectedHeading = selectedTab;
    modalName = selectedChatConfigDetails?.agent_name;
  }
  

  return (
    <div>
      <div>
        <div>
          <SelectedModalHeading>{selectedHeading}</SelectedModalHeading>
          <SelectCarotIcon onClick = {() => setShowMenu(!showMenu)}/>
        </div>
        <SelectedModal>{modalName}</SelectedModal>
        {showMenu && 
          <ModalSelectContainer
            onMouseLeave = {() => setShowMenu(false)}
          >
            <List
              itemLayout="horizontal"
              dataSource={PlayGroundModals}
              renderItem={(itemData: any, index: number) => (
                <List.Item 
                  style={{display:'flex', position:'relative'}}
                  onClick = {() => handleClick(itemData.key)}
                >
                  <PlaygroundTypeListContainer 
                    key={index}
                  >
                    <div style={{ minWidth: 14 }}>
                      {selectedTab === itemData.key && 
                        <SelectPayGroundIcon />
                      }
                    </div>
                    
                    <div style={{ width: "100%" }}>
                      <PlaygroundTypeListHeading>
                        <span style= {{color: selectedTab === itemData.key ?  '#602EDF' : '#222222'}}>{itemData.value}</span>
                        <span>
                          <RightOutlined />
                        </span>
                      </PlaygroundTypeListHeading>
                    </div>
                  </PlaygroundTypeListContainer>
                   {(selectedTab === 'WORKFLOW' && index === 0) &&(
                    <SubMenuContainer>
                      <PlaygroundWorkflowConfiguration
                        selectedChatConfigId={selectedChatConfigId}
                        setSelectedChatConfigId={setSelectedChatConfigId}
                        selectedChatConfigDetails={selectedChatConfigDetails}
                        setSelectedChatConfigDetails={setSelectedChatConfigDetails}
                      />
                    </SubMenuContainer>
                  )} 
                  {(selectedTab === 'AGENT' && index === 1) &&(
                      <SubMenuContainer>
                        <PlaygroundAgentConfiguration
                          selectedChatConfigId={selectedChatConfigId}
                          setSelectedChatConfigId={setSelectedChatConfigId}
                          selectedChatConfigDetails={selectedChatConfigDetails}
                          setSelectedChatConfigDetails={setSelectedChatConfigDetails}
                          isNewAgentConfig = {isNewAgentConfig}
                          setIsNewAgentConfig = {setIsNewAgentConfig}
                        />
                      </SubMenuContainer>
                  )} 
                </List.Item>
              )}
            />
          </ModalSelectContainer>
        }
      </div>
    </div>

    

    // <PlaygroundConfigurationContainer
    //   tabList={PlaygroundConfigurationOptions}
    //   tabBarExtraContent={
    //     <Button
    //       icon={<PlusOutlined />}
    //       onClick={() => changeConversation(undefined)}
    //     >
    //       New Chat
    //     </Button>
    //   }
    //   activeTabKey={selectedTab}
    //   onTabChange={(key: any) => setSelectedTab(key)}
    // >
    //   {getSelectedTabChildren()}
    // </PlaygroundConfigurationContainer>
  );
};

export default PlaygroundChatConfiguration;
