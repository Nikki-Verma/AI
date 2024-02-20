import { ReactNode } from "react";
import SlackIcon from "../Icons/SlackIcon";
import TelegramIcon from "../Icons/Telegram";
import { AvailableChannelType, ChannelType } from "./constant";

export const Integration_Available_Channels: AvailableChannelType[] = [
  {
    channelType: ChannelType.SLACK,
    name: "slack",
    displayName: "Slack",
    imageUrl: <SlackIcon />,
  },
  {
    channelType: ChannelType.TELEGRAM,
    name: "telegram",
    displayName: "Telegram",
    imageUrl: <TelegramIcon />,
  },
];

export const ChannelTableDetails: {
  [key in ChannelType]: {
    text: string;
    icon: ReactNode;
  };
} = {
  [ChannelType.SLACK]: {
    text: "Slack",
    icon: <SlackIcon style={{ height: "24px", width: "24px" }} />,
  },
  [ChannelType.TELEGRAM]: {
    text: "Telegram",
    icon: <TelegramIcon style={{ height: "24px", width: "24px" }} />,
  },
};
