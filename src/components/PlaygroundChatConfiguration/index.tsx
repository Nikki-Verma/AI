"use client";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, List, Select } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PlaygroundAgentConfiguration from "../PlaygroundAgentConfiguration";
import PlaygroundWorkflowConfiguration from "../PlaygroundWorkflowConfiguration";
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
} from "./style";
import SelectCarotIcon from "../Icons/SelectCarotIcon";
import SelectPayGroundIcon from "../Icons/SelectPayGroundIcon";

selectedTab: PlaygroundConfigurationOptionType;
// setSelectedTab: (value: PlaygroundConfigurationOptionType) => void;

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

  return (
    <div>
      <div>
        <div>
          <SelectedModalHeading>{selectedTab}</SelectedModalHeading>
          <SelectCarotIcon onClick = {() => setShowMenu(!showMenu)}/>
        </div>
        <SelectedModal>{selectedChatConfigDetails?.label}</SelectedModal>
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
                  // onMouseOver = {() => setShowMenu(false)}
                  
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
                  {/* {getSelectedTabChildren(selectedTab)} */}

                   {(selectedTab === 'WORKFLOW' && index === 0) &&(
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right:'-206px',
                      minWidth: 196
                    }}>
                      <PlaygroundWorkflowConfiguration
                        selectedChatConfigId={selectedChatConfigId}
                        setSelectedChatConfigId={setSelectedChatConfigId}
                        selectedChatConfigDetails={selectedChatConfigDetails}
                        setSelectedChatConfigDetails={setSelectedChatConfigDetails}
                      />
                    </div>
                  )} 

                  {(selectedTab === 'AGENT' && index === 1) &&(
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right:'-206px',
                        minWidth: 196
                      }}>
                      <PlaygroundAgentConfiguration
                        selectedChatConfigId={selectedChatConfigId}
                        setSelectedChatConfigId={setSelectedChatConfigId}
                        selectedChatConfigDetails={selectedChatConfigDetails}
                        setSelectedChatConfigDetails={setSelectedChatConfigDetails}
                      />
                      </div>
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
