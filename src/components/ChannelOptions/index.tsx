import { Flex } from "antd";
import ChannelCard from "../ChannelCard";
import {
  AvailableChannelType,
  ChannelType,
} from "../IntegrateChannelModal/constant";
import { ChannelOptionsContainer, ChannelOptionsDescription } from "./style";

type ChannelOptionsProps = {
  setSelectedChannel: (val: ChannelType) => void;
  availableOptions: AvailableChannelType[];
};

const ChannelOptions = ({
  setSelectedChannel,
  availableOptions,
}: ChannelOptionsProps) => {
  return (
    <ChannelOptionsContainer>
      {/* <ChannelOptionsDescription>
        We'll create a data table that can be added to any tool or agent.
        Knowledge is used to provide context to the large language model.
      </ChannelOptionsDescription> */}
      <Flex gap={20} wrap="wrap" justify="center" align="center">
        {availableOptions.map((channel: AvailableChannelType) => {
          return (
            <ChannelCard
              channel={channel}
              setSelectedChannel={setSelectedChannel}
            />
          );
        })}
      </Flex>
    </ChannelOptionsContainer>
  );
};

export default ChannelOptions;
