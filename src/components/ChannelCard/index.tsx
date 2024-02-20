import {
  AvailableChannelType,
  ChannelType,
} from "../IntergrateChannelModal/constant";
import { ChannelCardContainer, ChannelCardTitle } from "./style";
type ChannelCardProps = {
  setSelectedChannel: (val: ChannelType) => void;
  channel: AvailableChannelType;
};
const ChannelCard = ({ channel, setSelectedChannel }: ChannelCardProps) => {
  return (
    <ChannelCardContainer
      onClick={() =>
        setSelectedChannel ? setSelectedChannel(channel?.channelType) : null
      }
      disabled={channel?.disabled}
    >
      <div style={{ margin: "0 auto" }}>{channel?.imageUrl}</div>
      <ChannelCardTitle>{channel.displayName}</ChannelCardTitle>
    </ChannelCardContainer>
  );
};

export default ChannelCard;
