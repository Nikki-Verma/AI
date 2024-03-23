import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { Col, Divider, List, Result, Row } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DescriptionList, { DescriptionItemType } from "../DescriptionList";
import { AgentSelect, PlaygroundAgentConfigurationContainer, AgentSelectListContainer } from "./style";

type PlaygroundAgentConfigurationProps = {
  setSelectedChatConfigId: (chatConfigId: string | undefined) => void;
  selectedChatConfigId: string | undefined;
  selectedChatConfigDetails: UnknownObject | undefined;
  setSelectedChatConfigDetails: (chatConfig: UnknownObject | undefined) => void;
  isNewAgentConfig?:boolean;
  setIsNewAgentConfig?: any
};

const AgentDetailColumns: DescriptionItemType[] = [
  {
    label: "Model Name",
    key: "model_detail",
    width: "100%",
    render: (model_detail: any) => model_detail?.model_name ?? "--",
  },
  {
    label: "Knowledge Base Name",
    key: "kb",
    width: "100%",
    render: (kb: any) => kb?.kb_name ?? "--",
  },
];

const PlaygroundAgentConfiguration = ({
  selectedChatConfigId,
  setSelectedChatConfigId,
  selectedChatConfigDetails,
  setSelectedChatConfigDetails,
  isNewAgentConfig, 
  setIsNewAgentConfig
}: PlaygroundAgentConfigurationProps) => {
  const { data: session }: any = useSession();
  const { data, isLoading, isError, error, refetch } = useFetchData(
    session?.user?.permissions?.includes?.("ALL_LIST_VIEW")
      ? config.agents.listAll
      : config.agents.list,
    { page: DEFAULT_PAGE, size: ALL_DATA_PAGE_SIZE },
    {},
  );

  useEffect(() => {
    if ((data && !selectedChatConfigId) || (data && !isNewAgentConfig)) {
      setIsNewAgentConfig(true)
      const newSelectedWorkflow = data?.result?.[0] ?? undefined;
      if (newSelectedWorkflow) {
        setSelectedChatConfigDetails(newSelectedWorkflow);
        setSelectedChatConfigId(newSelectedWorkflow?.agent_id);
      }
    }
  }, [data, selectedChatConfigId]);

  useEffect(() => {
    if (!!selectedChatConfigId && !selectedChatConfigDetails) {
      const selectedAgent = data?.result?.find(
        (agent: any) => agent?.agent_id === selectedChatConfigId,
      );
      if (selectedAgent) {
        setSelectedChatConfigDetails(selectedAgent);
      } else {
        setSelectedChatConfigDetails(undefined);
        setSelectedChatConfigId(undefined);
      }
    }
  }, [selectedChatConfigId]);

  useEffect(() => {
    if (isError) {
      setSelectedChatConfigDetails(undefined);
      setSelectedChatConfigId(undefined);
    }
  }, [isError]);

  if (isError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(error)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }

  const ItemData =  data?.result?.map((agent: any) => ({
    ...agent,
    value: agent?.agent_id,
    label: agent?.agent_name,
    key: agent?.agent_id,
  })) || []

  return (
    <PlaygroundAgentConfigurationContainer>
      <AgentSelectListContainer>
      <List
          itemLayout="horizontal"
          dataSource={ItemData}
          loading={isLoading}
          renderItem={(itemData:any, index:number) => (
            <List.Item>
              <div 
                key = {index}
                style={{
                  color: (selectedChatConfigId === itemData.key) 
                  ? '#602EDF' 
                  : '#222222'
                }}
                onClick = {() => {
                  setSelectedChatConfigId(itemData.value)
                  setSelectedChatConfigDetails(itemData);
                }}
              >
                {itemData.label}
              </div> 
            </List.Item>
          )}
      />

      </AgentSelectListContainer>
      {/* <AgentSelect
        showSearch
        placeholder="Select a agent"
        optionFilterProp="label"
        loading={isLoading}
        onChange={(value: any, option: any) => {
          setSelectedChatConfigId(value);
          setSelectedChatConfigDetails(option);
        }}
        value={selectedChatConfigId}
        options={
          data?.result?.map((agent: any) => ({
            ...agent,
            value: agent?.agent_id,
            label: agent?.agent_name,
            key: agent?.agent_id,
          })) || []
        }
      />

      {selectedChatConfigDetails && (
        <>
          <Divider orientationMargin="0" orientation="left">
            Details
          </Divider>
          <DescriptionList
            columns={AgentDetailColumns}
            data={selectedChatConfigDetails || {}}
            gapBetweenItems="large"
            vertical
          />
        </>
      )} */}
    </PlaygroundAgentConfigurationContainer>
  );
};

export default PlaygroundAgentConfiguration;
